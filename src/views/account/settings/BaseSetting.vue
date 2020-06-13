<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">

        <a-form layout="vertical">
          <a-form-item
            label="昵称"
            :required="true"
          >
            <a-input v-model="nickName" placeholder="请输入昵称"/>
          </a-form-item>

          <a-form-item
            label="电子邮件"
            :required="true"
          >
            <a-input v-model="email" placeholder="请输入电子邮件"/>
          </a-form-item>
          <a-form-item
            label="手机号码"
            :required="true"
          >
            <a-input v-model="mobile" placeholder="请输入手机号码"/>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="handleUpdateUser">提交</a-button>
          </a-form-item>
        </a-form>

      </a-col>


    </a-row>


  </div>
</template>

<script>
  import AvatarModal from './AvatarModal'
  import {getCurrentUser, updateUser} from "@/api/userApi";

  export default {
    components: {
      AvatarModal
    },
    created() {
      getCurrentUser().then(e => {
        const {data} = e;
        this.nickName = data.nick_name;
        this.mobile = data.mobile;
        this.email = data.email;
        this.id = data.id;
      });
    },
    data() {
      return {
        // cropper
        preview: {},
        nickName: "",
        mobile: "",
        email: ""
      }
    },
    methods: {
      handleUpdateUser() {
        updateUser({
          id: this.id,
          nick_name: this.nickName,
          mobile: this.mobile,
          email: this.email
        }).then(e => {
          this.$message.success("更新数据成功");
        })
      }
    }
  }
</script>

<style lang="less" scoped>

  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }

  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }

    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0, 0, 0, 0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>
