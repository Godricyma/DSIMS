<template>
  <home>
    <div class="main">
      <form action="" method="post" class="patch-upgrade">
        <label v-for="(argument) in arguments" :key="argument">
          <span>{{ argument }}</span>
          <input id="argument" type="text">
        </label>
        <label>
          <span>download_code</span>
          <input type="checkbox"/>
        </label>
        <label>
          <span>&nbsp;</span>
          <input class="button" type="button" value="提交"/>
        </label>
      </form>
    </div>
  </home>
</template>

<script>
import home from '../Home.vue'
export default {
  data() {
    return {
      arguments: ['project_name', 'ip', 'package_url', 'package_name', 'download_package', 'last_patch_number', 'jira_key']
    };
  },
  components: {home}
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

.patch-upgrade label {
  display: block;
  margin: 0px;
}

.patch-upgrade label>span {
  float: left;
  width: 20%;
  text-align: right;
  padding-right: 10px;
  margin-top: 10px;
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
  background: rgb(24, 144, 255);
  border: none;
  padding: 10px 25px 10px 25px;
  color: #FFF;
  box-shadow: 1px 1px 5px #B6B6B6;
  border-radius: 3px;
  text-shadow: 1px 1px 1px rgb(14, 124, 235);
  cursor: pointer;
  margin: 20px;
}

.patch-upgrade .button:hover {
  background: rgb(14, 134, 245);
}

</style>