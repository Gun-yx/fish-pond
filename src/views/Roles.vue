<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--卡片视图-->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <!--角色列表区-->
      <el-table :data="rolelist" border stripe >
        <!--展开列-->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row :class="[bdbottom,i1 === 0 ? 'bdbottom': '']" v-for="(item1,i1) in scope.row.children" :key="item1.id">
              <!--渲染一级权限-->
              <el-col :span="5">
                <el-tag>{{item1.authName}}</el-tag>
              </el-col>
              <!--渲染二级三级权限-->
              <el-col :span="19"></el-col>
            </el-row>
          </template>
        </el-table-column>
        <!--索引列-->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
            <el-button type="warning" size="mini" icon="el-icon-setting">分配权限</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return{
      //所有角色列表数据
      rolelist:[]
    }
  },
  created(){
    this.getRoleList()
  },
  methods:{
    //获取所有角色的列表
    async getRoleList(){
      const {data:res} = await this.$http.get('roles')
      if(res.meta.status !== 200) {
        return this.$message.error("获取角色列表失败");
      }
      this.rolelist = res.data

    }
  }

}
</script>

<style>
.el-tag{
  margin: 10px;
}

.bdtop{
  border-top: 1px solid #eee;
}

bdbottom{
  border-bottom: 1px solid #eee;
}
</style>