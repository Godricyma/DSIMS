<template>
    <home>
        <div style="width: 100%" align="center">
            <div class="alert_msg alert alert-danger" role="alert" id="alert_msg">
            </div>
            <div class="mb-3" style="width: 20%" id="selectapk">
                <input class="form-control" aria-required="true" type="file" id="fromFile" accept=".apk" @change="getFile($event)">
            </div>
            <div class="mb-3" style="width: 20%">
                <select class="form-select" aria-label="Default select example" id="select_project">
                    <option v-for="project in projects" :key="project.id">{{project.pname}}</option>
                </select>
            </div>
            <div class="mb-3 text-center">
                <button type="button" class="btn btn-primary" @click="submitForm($event)">提交</button>
                <button id="download" type="button" class="download_btn btn btn-info" @click="download()">下载</button>
            </div>
        </div>
    </home>
</template>

<script>
    import home from "../Home.vue";
    import axios from "axios";
    import $ from "jquery";

    axios.defaults.withCredentials = false;//Cookie跨域

    var download_file = ""

    export default {
        name: "operator",
        data() {
            return {
                name: "上传文件",
                checkStatus: "",
                projects: ['test'],
            }
        },
        methods: {
            showMask(msg) {
                console.log(msg)
            },
            getProjects() {
                this.showMask("Loading...")
                axios.get('http://192.168.162.142:8080/dsims/signapk/project/', {
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    }
                }).then(response => {
                    console.log(response.data)
                    this.projects = response.data
                    this.msg = 'get project data from django api'
                })
            },
            getFile(event) {
                this.file = event.target.files[0]
                console.log(this.file)
            },
            submitForm(event) {
                event.preventDefault();
                let formData = new FormData();
                formData.append("file", this.file);
                formData.append("project", $("#select_project option:selected").text())
                formData.append("type", "upload")
                // 创建一个空的axios 对象
                const instance = axios.create({
                    baseURL: "http://192.168.162.142:8080",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8",
                    },
                })
                instance.post('/dsims/signapk/operator/', formData).then(response => {
                    download_file = response.data["download"]
                    let msg = response.data["msg"]
                    let code = response.data["code"]
                    console.log(download_file, msg, code)
                    if (typeof (download_file) == "undefined") {
                        if (code === 2) {
                            alert(msg)
                        }
                    } else {
                        document.getElementById("download").style.visibility = "visible"
                    }
                })
            },
            downloadFile(url, options = {}) {
                return new Promise(((resolve, reject) => {
                    axios({
                        method: 'post',
                        url: url,
                        data: options,
                        responseType: 'blob'
                    }).then(
                        response => {
                            resolve(response.data)
                            let blob = new Blob([response.data], {
                                type: 'application/vnd.ms-excel'
                            })
                            let fileNameEncode = response.headers['content-disposition'].split('filename=')[1]
                            let fileName = decodeURIComponent(fileNameEncode)
                            if (window.navigator.msSaveOrOpenBlob) {
                                navigator.msSaveBlob(blob, fileName)
                            } else {
                                var link = document.createElement('a')
                                link.href = window.URL.createObjectURL(blob)
                                link.download = fileName
                                link.click()
                                window.URL.revokeObjectURL(link.href)
                            }
                        },
                        error => {
                            reject(error)
                        }
                    )
                }))
            },
            download() {
                let postUrl = "http://192.168.162.142:8080/dsims/signapk/operator/"
                let params = {
                    filename: download_file,
                    'type': "download"
                }
                this.downloadFile(postUrl, params)
            }

        },
        mounted() {
            this.getProjects();
        },
        components: {home}
    }
</script>

<style>
    .download_btn {
        margin-left: 50px;
        visibility: hidden;
    }

    .alert_msg {
        display: none;
    }

</style>