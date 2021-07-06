<template>
  <div class="main">
    <form method="post" class="patch-upgrade">
      <div v-for="(argument, index) in arguments" :key="index">
        <span>{{ argument }}</span>
        <input v-model="obj[argument]" type="text">
      </div>
      <div>
        <span>download_package</span>
        <input v-model="obj['download_package']" type="checkbox"/>
      </div>
      <div>
        <input class="button" type="button" value="提交" @click="postInfo();"/>
      </div>
    </form>
  </div>
</template>

<script>
import { postData } from '@/api'

export default {
  data() {
    return {
      arguments: ['project_name', 'package_url', 'package_name', 'last_patch_number', 'jira_key'],
      obj: {}
    };
  },
  mounted() {
    this.arguments.forEach(item => {
      this.obj[item] = "";
      this.obj['download_package'] = "";
    })
  },
  methods: {
    postInfo() {
      postData('/dsims/patchimport/patches/', this.obj)
      .then(res=> {
        console.log(res.data)
        this.$router.push('/patchimport/history')
      })
      .catch(error=>{ 
        alert('提交失败！');
        console.log(error)
      });
    },
  },
}
</script>

<style>
.main {
  height: 100%;
}

.patch-upgrade {
  margin-left: auto;
  margin-right: auto;
  background-color: #F7F7F7;
  padding: 25px 15px 25px 10px;
  font: 20px Georgia, "Times New Roman", Times, serif;
  /* border:1px solid #E4E4E4; */
}

.patch-upgrade input {
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
}

.patch-upgrade span {
  float: left;
  width: 20%;
  text-align: right;
  padding-right: 10px;
}

.patch-upgrade input[type="text"] {
  border: 1px solid #828282;
  height: 30px;
  margin-bottom: 16px;
  margin-right: 6px;
  margin-top: 4px;
  outline: 0 none;
  padding: 3px 3px 3px 5px;
  width: 60%;
  font-size: 17px;
  line-height:20px;
  box-shadow: inset 0px 1px 4px #ECECEC;
  -moz-box-shadow: inset 0px 1px 4px #ECECEC;
  -webkit-box-shadow: inset 0px 1px 4px #ECECEC;
}

.patch-upgrade .button {
  width: 8%;
  height: 35px;
  line-height: 15px;
  background: rgb(24, 144, 255);
  border: none;
  color: #FFF;
  box-shadow: 1px 1px 5px #B6B6B6;
  border-radius: 3px;
  text-shadow: 1px 1px 1px rgb(14, 124, 235);
  cursor: pointer;
  margin-left: 46%;
}

.patch-upgrade .button:hover {
  background: rgb(14, 134, 225);
}

</style>