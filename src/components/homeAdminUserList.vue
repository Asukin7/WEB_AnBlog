<template>
  <div>
    <div>
      <Table :columns="tableHeader" :data="userList">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="roleList">
          <Tag type="border" v-for="item in row.roleList" :key="item.id">{{item.name}}</Tag>
          <Poptip transfer>
            <Button icon="ios-settings" type="dashed" size="small">管理</Button>
            <div slot="content">
              <CheckboxGroup v-model="roleIdListCheckbox">
                <Checkbox :label="role.id" v-for="role in roleList" :key="role.id">{{role.name}}</Checkbox>
              </CheckboxGroup>
              <Button type="primary" size="small" @click="changeRoleList(index)">确定</Button>
            </div>
          </Poptip>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <i-switch :value="row.enabled" :true-value="1" :false-value="0" @on-change="changeEnabled(index)"/>
        </template>
      </Table>
    </div>
    <div style="margin-top: 10px; display: flex; justify-content: flex-end; align-items: center;">
      <Page @on-change="pageChange" :total="userTotal" :current="page" :page-size="size"/>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableHeader: [
        {
          title: 'id',
          key: 'id'
        },
        {
          title: '账号',
          key: 'username'
        },
        {
          title: '邮箱',
          key: 'email'
        },
        {
          title: '昵称',
          key: 'nickname'
        },
        {
          title: '权限',
          slot: 'roleList',
          align: 'center'
        },
        {
          title: '启用',
          slot: 'action',
          align: 'center'
        }
      ],
      userList: [],
      userTotal: 0,
      roleList: [],
      roleIdListCheckbox: [],
      page: 1,
      size: 10
    }
  },
  mounted () {
    this.page = 1
    this.size = 10
    this.getRoleList()
    this.getUserList()
  },
  watch: {
    '$route' (to, from) {
      this.page = 1
      this.size = 10
      this.getRoleList()
      this.getUserList()
    }
  },
  methods: {
    getRoleList () {
      this.$get('/tourist/roleList')
        .then(data => {
          this.roleList = data.data.data.roleList
        })
    },
    getUserList () {
      this.$get('/admin/userList' + '?page=' + this.page + '&size=' + this.size)
        .then(data => {
          this.userList = data.data.data.userList
          this.userTotal = data.data.data.userTotal
        })
    },
    changeEnabled (index) {
      var enabled = this.userList[index].enabled
      if (enabled === 1) enabled = 0
      else enabled = 1
      this.$put('/admin/user/' + this.userList[index].id + '/enabled', { enabled: enabled })
        .then(data => {
          if (data.data.code === 0) { // 成功
            this.userList[index].enabled = enabled
          } else { // 失败
            this.$Message.error(data.data.message) // 提示
          }
        })
    },
    changeRoleList (index) {
      var roleList = []
      for (let i = 0; i < this.roleIdListCheckbox.length; i++) {
        roleList.push({
          id: this.roleIdListCheckbox[i],
          name: this.getRoleName(this.roleIdListCheckbox[i])
        })
      }
      if (!(roleList.length > 0)) {
        this.$Message.error('请选择至少一个') // 提示
      } else {
        this.$put('/admin/user/' + this.userList[index].id + '/roleList', { roleList: roleList })
          .then(data => {
            if (data.data.code === 0) { // 成功
              this.userList[index].roleList = roleList
            } else { // 失败
              this.$Message.error(data.data.message) // 提示
            }
          })
      }
    },
    getRoleName (id) {
      for (let i = 0; i < this.roleList.length; i++) {
        if (this.roleList[i].id === id) return this.roleList[i].name
      }
    },
    pageChange (page) {
      this.page = page
      this.getUserList()
    }
  }
}
</script>
<style>
</style>
