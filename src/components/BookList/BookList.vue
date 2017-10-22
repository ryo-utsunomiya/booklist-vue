<template>
  <div>
    <el-input v-model="newBook" @keyup.native.enter="create" style="width: 90%;" placeholder="New book"></el-input>
    <el-button type="primary" @click.prevent="create">Add</el-button>
    <el-table :data="books" style="width: 100%; margin-top: 10px;">
      <el-table-column label="Title" prop="title"></el-table-column>
      <el-table-column label="Rate" prop="rate" width="100"></el-table-column>
      <el-table-column label="Action" width="250">
        <template scope="scope">
          <el-button type="primary" icon="plus" size="mini" @click.prevent="increment(scope.$index)"></el-button>
          <el-button type="primary" icon="minus" size="mini" @click.prevent="decrement(scope.$index)"></el-button>
          <el-button type="danger" icon="close" size="mini" @click.prevent="remove(scope.$index)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible">
      {{ dialogMessage }}
      <span slot="footer">
        <el-button @click="dialogVisible = false">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script src="./BookList.js"></script>
<style scoped></style>
