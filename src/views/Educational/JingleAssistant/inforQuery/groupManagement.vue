<template>
  <div class="MessageQuery-container">
    <div class="btn-container">
      <el-dropdown size="small" split-button type="primary" @command="handleCommand">
        创建 |
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="class">班级群</el-dropdown-item>
          <el-dropdown-item command="serve">服务群</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 页面右边按钮***end -->
    <div class="flex-wrap pt12 pl12 pr12">
      <div class="flex-al mb12">
        <div class="mr20">
          <el-checkbox v-model="checked">
            班级群
            <i class="icon-yw"></i>
          </el-checkbox>
          <el-checkbox v-model="checked2">
            服务群
            <i class="icon-yw"></i>
          </el-checkbox>
          <el-checkbox v-model="checked3">显示已停用群</el-checkbox>
        </div>
        <span class="mr10 fs14 color-666">老师</span>
        <div class="select-box" style="width:170px;">
          <el-select
            v-model="filter.time"
            filterable
            clearable
            placeholder="请选择老师"
            @change="search"
          >
            <el-option
              v-for="item in filter.postList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="lines ml16 mr16 mb12"></div>
      <div class="flex-al Inquire-box mb12">
        <div class="ipt-box" style="width:200px;">
          <el-input
            v-model="filterDetails.keyword"
            @clear="searchDetails"
            @keyup.enter.native="searchDetails"
            clearable
            placeholder="发送人、内容"
          ></el-input>
        </div>
        <el-button @click="searchDetails" type="primary" size="small" class="search-btn fs14">查询</el-button>
      </div>
    </div>
    <div class="tableDiv" ref="auto_height_table">
      <switchTableCont
        :tableData="tableList"
        @handSetting="handSetting"
        @handleColumnChange="handleColumnChange"
      ></switchTableCont>
      <!-- 分页 -->
      <el-pagination
        style="margin: 10px;"
        :current-page.sync="paging.curPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size.sync="paging.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="paging.pageTotal"
        @current-change="curPageChange"
        @size-change="pageSizeChange"
      ></el-pagination>
    </div>
    <!-- 点击查看 -->
    <div class="small-dialog" v-if="viewDetails">
      <el-dialog
        title="出勤学员评价详情"
        :visible.sync="viewDetails"
        width="900px"
        @close="handleClose"
        :before-close="handleClose"
      >
        <div class="dialog-content">
          <div class="flex-wrap">
            <div class="flex-al mb12">
              <span class="mr10 fs14 color-666">是否评价</span>
              <div class="select-box" style="width:140px;">
                <el-select v-model="filterDetails.isPing" clearable filterable placeholder="是否评价">
                  <el-option
                    v-for="item in filterDetails.pingList"
                    :key="item.region_id"
                    :label="item.region_name"
                    :value="item.region_id"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="lines ml16 mr16 mb12"></div>
            <div class="flex-al Inquire-box mb12">
              <div class="ipt-box" style="width:280px;">
                <el-input
                  v-model="filterDetails.keyword"
                  @clear="searchDetails"
                  @keyup.enter.native="searchDetails"
                  clearable
                  placeholder="单行输入"
                ></el-input>
              </div>
              <el-button
                @click="searchDetails"
                type="primary"
                size="small"
                class="search-btn fs14"
              >查询</el-button>
            </div>
          </div>
          <div class="tableDiv">
            <levelTableCont :tableData="tableviewDetails"></levelTableCont>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="viewDetails = false">确 定</el-button>
          <el-button size="mini" @click="viewDetails = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 创建服务群 -->
    <div class="small-dialog" v-if="createdServe">
      <el-dialog
        title="创建服务群"
        :visible.sync="createdServe"
        width="700px"
        class="createdServe"
        :before-close="handleClose"
      >
        <div class="dialog-content">
          <el-alert title="选择学员后，关联的带班老师自动添加到老师列表" type="info" show-icon></el-alert>
          <div class="pAll15">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="群名" prop="name" style="width:400px;">
                <el-input v-model="ruleForm.name" placeholder="请输入群名"></el-input>
              </el-form-item>
              <el-form-item label="已选学员" prop="desc" class="attend_Person">
                <el-button type="primary" @click="choosePeople" size="small">选择已选学员</el-button>
                <ul class="fa-list">
                  <li v-for="(item,index) in StudentData.choosePeopleList" :key="index">
                    {{ item.a1 }}
                    <i
                      class="el-icon-circle-close mr30"
                      @click="handleRemove(index,item, 'people')"
                    ></i>
                  </li>
                </ul>
              </el-form-item>
              <el-form-item label="已选老师" prop="desc" class="attend_Person">
                <el-button type="primary" @click="choosePeople" size="small">选择已选老师</el-button>
                <ul class="fa-list">
                  <li v-for="(item,index) in StudentData.choosePeopleList" :key="index">
                    {{ item.a1 }}
                    <i
                      class="el-icon-circle-close mr30"
                      @click="handleRemove(index,item, 'people')"
                    ></i>
                  </li>
                </ul>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="createdServe = false">确 定</el-button>
          <el-button size="mini" @click="createdServe = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 选择班级 -->
    <!-- <div class="small-dialog" v-if="createdClass">
      <el-dialog
        title="选择班级"
        :visible.sync="createdClass"
        width="700px"
        class="createdClass"
        :before-close="handleClose"
      >
        <div class="dialog-content"></div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="createdClass = false">确 定</el-button>
          <el-button size="mini" @click="createdClass = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>-->

    <div class="small-dialog popTips addStu" v-if="choosePeopleVis">
      <el-dialog title="添加学员" :visible="choosePeopleVis" @close="clearData" width="1200px">
        <div class="dialog-content">
          <div class="flex-wrap pt12 pl12 pr12">
            <div class="flex-al mb12">
              <div class="time-box flex-al">
                <span class="mr10 fs14 color-666">课程别</span>
                <el-select
                  v-model="StudentData.groupId"
                  filterable
                  clearable
                  :popper-append-to-body="false"
                  placeholder="请选择课程别"
                  style="width:200px"
                  @change="filterChoosePeople"
                >
                  <el-option
                    v-for="item in StudentData.groupList"
                    :key="item.group_fnumber"
                    :label="item.group_name"
                    :value="item.group_fnumber"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="lines ml16 mr16 mb12"></div>
            <div class="flex-al mb12">
              <div class="time-box flex-al">
                <span class="mr10 fs14 color-666">班级</span>
                <el-select
                  v-model="StudentData.positionId"
                  filterable
                  clearable
                  :popper-append-to-body="false"
                  placeholder="请选择班级"
                  style="width:200px"
                  @change="filterChoosePeople"
                >
                  <el-option
                    v-for="item in StudentData.positionList"
                    :key="item.position_name"
                    :label="item.position_name"
                    :value="item.position_name"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="lines ml16 mr16 mb12"></div>
            <div class="flex-al Inquire-box mb12">
              <div class="ipt-box" style="width:200px;">
                <el-input
                  v-model="StudentData.keyword"
                  clearable
                  placeholder="姓名搜索"
                  @clear="filterChoosePeople"
                  @keyup.enter.native="filterChoosePeople"
                ></el-input>
              </div>
              <el-button
                type="primary"
                size="small"
                class="search-btn fs14"
                @click="filterChoosePeople"
              >查询</el-button>
            </div>
          </div>
          <noBorderTableCont
            :tableData="StudentData.tableList"
            @handleSelectionChange="handleChoosePeopleChange"
          ></noBorderTableCont>
          <!-- 分页 -->
          <el-pagination
            class="pAll10 bg-white el-page mb10"
            :current-page.sync="StudentData.paging.curPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size.sync="StudentData.paging.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="StudentData.paging.pageTotal"
            @current-change="peoplePageChange"
            @size-change="peopleSizeChange"
          ></el-pagination>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="handleChoosePeople">确定</el-button>
          <el-button size="mini" @click="clearData">取消</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 查看群信息 -->
    <div class="small-dialog" v-if="seeGroup">
      <el-dialog
        title="查看群信息"
        :visible.sync="seeGroup"
        width="700px"
        class="seeGroup"
        :before-close="handleClose"
      >
        <div class="dialog-content">
          <div class="staff-edit" v-if="isEdit">
            <div class="slider-btn">
              <el-button type="primary" size="mini" @click="isEdit = !isEdit">编辑</el-button>
            </div>
          </div>
          <div class="staff-edit" v-else>
            <div class="slider-btn">
              <el-button type="primary" size="mini" @click="isEdit = !isEdit">确定</el-button>
            </div>
          </div>
          <div class="body-container">
            <ul v-if="isEdit">
              <li>
                <div class="label">群组名称</div>
                <div class="content">1班班级群</div>
              </li>
              <li>
                <div class="label">群类型</div>
                <div class="content">班级群</div>
              </li>
              <li>
                <div class="label">头像</div>
                <div class="content">
                  <i class="icon-dbks"></i>
                </div>
              </li>
              <li>
                <div class="label">群主</div>
                <div class="content">
                  <img :src="userData[0].url" alt />
                  {{userData[0].name}}
                </div>
              </li>
              <li>
                <div class="label">成员</div>
                <div class="content contentUser">
                  <div class="container">
                    <div class="img-list" v-for="(item, index) in userData" :key="index">
                      <img :src="item.url" alt />
                      <span>{{item.name}}</span>
                    </div>
                  </div>
                  <el-button type="text" style="margin-left:20px;" @click="seeAllPeople=true">查看全部成员</el-button>
                </div>
              </li>
              <li>
                <div class="label">介绍</div>
                <div
                  class="content"
                >这是学校内部交流讨论群，禁止在群里讨论除学习外的任何话题。这是学校内部交流讨论群，禁止在群里讨论除学习外的任何话题。这是学校内部交流讨论群，禁止在群里讨论除学习…</div>
              </li>
            </ul>
            <div v-else>
              <ul>
                <li>
                  <div class="label">群组名称</div>
                  <el-input placeholder="请输入群名" style="width:350px" v-model="ruleForm.name"></el-input>
                </li>
                <li>
                  <div class="label">群类型</div>
                  <div class="content">班级群</div>
                </li>
                <li>
                  <div class="label">头像</div>
                  <div class="content">
                    <i class="icon-dbks"></i>
                  </div>
                </li>
                <li>
                  <div class="label">群主</div>
                  <div class="content">
                    <img :src="userData[0].url" alt />
                    {{userData[0].name}}
                    <el-button type="text" style="margin-left:10px" @click="handlePeopleChange">修改</el-button>
                  </div>
                </li>
                <li>
                  <div class="label">成员</div>
                  <div class="content contentUser">
                    <div class="container">
                      <div class="img-list" v-for="(item, index) in userData" :key="index">
                        <img :src="item.url" alt />
                        <span>{{item.name}}</span>
                      </div>
                    </div>
                    <el-button
                      type="text"
                      style="margin-left:20px;"
                      @click="seeAllPeople=true"
                    >查看全部成员</el-button>
                  </div>
                </li>
                <li>
                  <div class="label">介绍</div>
                  <el-input v-model="mess" :rows="3" type="textarea"></el-input>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="seeGroup = false">确 定</el-button>
          <el-button size="mini" @click="seeGroup = false">取 消</el-button>
        </span>-->
      </el-dialog>
    </div>

    <!-- 查看全部成员 -->
    <div class="small-dialog" v-if="seeAllPeople">
      <el-dialog
        title="查看全部成员"
        :visible.sync="seeAllPeople"
        width="700px"
        class="seeAllPeople"
        :before-close="handleClose"
      >
        <div class="dialog-content">
          <div class="flex-wrap pt12 pl12 pr12">
            <div class="flex-al mb12">
              <div class="time-box flex-al">
                <span class="mr10 fs14 color-666">类型</span>
                <el-select
                  v-model="StudentData.groupId"
                  filterable
                  clearable
                  :popper-append-to-body="false"
                  placeholder="不限"
                  style="width:200px"
                  @change="filterChoosePeople"
                >
                  <el-option
                    v-for="item in StudentData.groupList"
                    :key="item.group_fnumber"
                    :label="item.group_name"
                    :value="item.group_fnumber"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="lines ml16 mr16 mb12"></div>
            <div class="flex-al Inquire-box mb12">
              <div class="ipt-box" style="width:200px;">
                <el-input
                  v-model="StudentData.keyword"
                  clearable
                  placeholder="职工姓名"
                  @clear="filterChoosePeople"
                  @keyup.enter.native="filterChoosePeople"
                ></el-input>
              </div>
              <el-button
                type="primary"
                size="small"
                class="search-btn fs14"
                @click="filterChoosePeople"
              >查询</el-button>
            </div>
          </div>
          <div class="people-container">
            <p>老师</p>
            <div class="teacher-container">
              <div class="people-info" v-for="(item, index) in teacherData" :key="index">
                <img :src="item.url" alt />
                <span>{{item.name}}</span>
              </div>
            </div>
            <p>群成员</p>
            <div class="user-container">
              <div class="people-info" v-for="(item, index) in studentData" :key="index">
                <img :src="item.url" alt />
                <span>{{item.name}}</span>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>

    <div class="small-dialog popTips addStu" v-if="selectClass">
      <el-dialog title="选择班级" :visible="selectClass" @close="clearData2" width="1200px">
        <div class="dialog-content">
          <div class="flex-wrap pt12 pl12 pr12">
            <div class="flex-al mb12">
              <div class="time-box flex-al">
                <span class="mr10 fs14 color-666">课程别</span>
                <el-select
                  v-model="ClassData.groupId"
                  filterable
                  clearable
                  :popper-append-to-body="false"
                  placeholder="请选择课程别"
                  style="width:200px"
                  @change="filterChoosePeople"
                >
                  <el-option
                    v-for="item in ClassData.groupList"
                    :key="item.group_fnumber"
                    :label="item.group_name"
                    :value="item.group_fnumber"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="lines ml16 mr16 mb12"></div>
            <div class="flex-al mb12">
              <div class="time-box flex-al">
                <span class="mr10 fs14 color-666">班级群开通状态</span>
                <el-select
                  v-model="ClassData.positionId"
                  filterable
                  clearable
                  :popper-append-to-body="false"
                  placeholder="请选择班级群开通状态"
                  style="width:200px"
                  @change="filterChoosePeople"
                >
                  <el-option
                    v-for="item in ClassData.positionList"
                    :key="item.position_name"
                    :label="item.position_name"
                    :value="item.position_name"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="lines ml16 mr16 mb12"></div>
            <div class="flex-al Inquire-box mb12">
              <div class="ipt-box" style="width:200px;">
                <el-input
                  v-model="ClassData.keyword"
                  clearable
                  placeholder="班级中/英文名、课程别编号"
                  @clear="filterChoosePeople"
                  @keyup.enter.native="filterChoosePeople"
                ></el-input>
              </div>
              <el-button
                type="primary"
                size="small"
                class="search-btn fs14"
                @click="filterChoosePeople"
              >查询</el-button>
            </div>
          </div>
          <switchTableCont
            :tableData="ClassData.tableList"
            @handleSelectionChange="handleChoosePeopleChange"
            @handleSelectionRadio="handleSelectionRadio"
          ></switchTableCont>
          <!-- 分页 -->
          <el-pagination
            class="pAll10 bg-white el-page mb10"
            :current-page.sync="ClassData.paging.curPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size.sync="ClassData.paging.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="ClassData.paging.pageTotal"
            @current-change="peoplePageChange"
            @size-change="peopleSizeChange"
          ></el-pagination>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="clearData2">确定</el-button>
          <el-button size="mini" @click="clearData2">取消</el-button>
        </span>
      </el-dialog>
    </div>

    <div class="small-dialog popTips addStu" v-if="selectStaff">
      <el-dialog title="选择职工" :visible="selectStaff" @close="clearData3" width="1200px">
        <div class="dialog-content">
          <div class="flex-wrap pt12 pl12 pr12">
            <div class="flex-al mb12">
              <div class="time-box flex-al">
                <span class="mr10 fs14 color-666">职位</span>
                <el-select
                  v-model="StaffData.groupId"
                  filterable
                  clearable
                  :popper-append-to-body="false"
                  placeholder="请选择职位"
                  style="width:200px"
                  @change="filterChoosePeople"
                >
                  <el-option
                    v-for="item in StaffData.groupList"
                    :key="item.group_fnumber"
                    :label="item.group_name"
                    :value="item.group_fnumber"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="lines ml16 mr16 mb12"></div>
            <div class="flex-al Inquire-box mb12">
              <div class="ipt-box" style="width:240px;">
                <el-input
                  v-model="StaffData.keyword"
                  clearable
                  placeholder="职工中/英文名、职工编号"
                  @clear="filterChoosePeople"
                  @keyup.enter.native="filterChoosePeople"
                ></el-input>
              </div>
              <el-button
                type="primary"
                size="small"
                class="search-btn fs14"
                @click="filterChoosePeople"
              >查询</el-button>
            </div>
          </div>
          <noBorderTableCont
            :tableData="StaffData.tableList"
            @handleSelectionChange="handleChoosePeopleChange"
            @handleSelectionRadio="handleSelectionRadio"
          ></noBorderTableCont>
          <!-- 分页 -->
          <el-pagination
            class="pAll10 bg-white el-page mb10"
            :current-page.sync="StaffData.paging.curPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size.sync="StaffData.paging.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="StaffData.paging.pageTotal"
            @current-change="peoplePageChange"
            @size-change="peopleSizeChange"
          ></el-pagination>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="mini" @click="clearData3">确定</el-button>
          <el-button size="mini" @click="clearData3">取消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import switchTableCont from "@/components/tables/switchTableCont.vue";
import levelTableCont from "@/components/tables/levelTableCont.vue";
import noBorderTableCont from "@/components/tables/noBorderTableCont";

export default {
  name: "MessageQuery-container",
  data() {
    let item = {
      a1: "1班群组",
      a2: "班级群",
      a3: "Eric",
      a4: "2018-09-09 18:00",
      a5: "20",
      a6: "100",
      a7: "2018-09-09 18:00"
    };
    let item2 = {
      a1: "菲菲菲",
      a2: "201908403894",
      a3: "女",
      a4: "18217189861",
      a5: "已入班",
      a6: "Wk美语",
      a7: "AS2"
    };
    return {
      selectClass: false,
      selectStaff: false,
      mess:
        "这是学校内部交流讨论群，禁止在群里讨论除学习外的任何话题。这是学校内部交流讨论群，禁止在群里讨论除学习外的任何话题。这是学校内部交流讨论群，禁止在群里讨论除学习…",
      isEdit: true,
      teacherData: [
        {
          name: "Eric",
          url:
            "https://pic.kedingdang.com/schoolmanage/202002181604x939720818.jpg"
        },
        {
          name: "Eric",
          url:
            "https://pic.kedingdang.com/schoolmanage/202002181604x939720818.jpg"
        }
      ],
      studentData: [
        {
          name: "Eric",
          url:
            "https://pic.kedingdang.com/schoolmanage/202002181604x939720818.jpg"
        },
        {
          name: "Eric",
          url:
            "https://pic.kedingdang.com/schoolmanage/202002181604x939720818.jpg"
        },
        {
          name: "Eric",
          url:
            "https://pic.kedingdang.com/schoolmanage/202002181604x939720818.jpg"
        },
        {
          name: "Eric",
          url:
            "https://pic.kedingdang.com/schoolmanage/202002181604x939720818.jpg"
        },
        {
          name: "Eric",
          url:
            "https://pic.kedingdang.com/schoolmanage/202002181604x939720818.jpg"
        },
        {
          name: "Eric",
          url:
            "https://pic.kedingdang.com/schoolmanage/202002181604x939720818.jpg"
        },
        {
          name: "Eric",
          url:
            "https://pic.kedingdang.com/schoolmanage/202002181604x939720818.jpg"
        },
        {
          name: "Eric",
          url:
            "https://pic.kedingdang.com/schoolmanage/202002181604x939720818.jpg"
        },
        {
          name: "Eric",
          url:
            "https://pic.kedingdang.com/schoolmanage/202002181604x939720818.jpg"
        },
        {
          name: "Eric",
          url:
            "https://pic.kedingdang.com/schoolmanage/202002181604x939720818.jpg"
        }
      ],
      seeAllPeople: false,
      userData: [
        {
          name: "Eric",
          url:
            "https://pic.kedingdang.com/schoolmanage/202002181604x939720818.jpg"
        },
        {
          name: "Eric",
          url:
            "https://pic.kedingdang.com/schoolmanage/202002181604x939720818.jpg"
        },
        {
          name: "Eric",
          url:
            "https://pic.kedingdang.com/schoolmanage/202002181604x939720818.jpg"
        },
        {
          name: "Eric",
          url:
            "https://pic.kedingdang.com/schoolmanage/202002181604x939720818.jpg"
        },
        {
          name: "Eric",
          url:
            "https://pic.kedingdang.com/schoolmanage/202002181604x939720818.jpg"
        },
        {
          name: "Eric",
          url:
            "https://pic.kedingdang.com/schoolmanage/202002181604x939720818.jpg"
        }
      ],
      choosePeopleVis: false,
      seeGroup: false,
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
      createdServe: false,
      createdClass: false,
      checked: true,
      checked2: true,
      checked3: false,
      viewDetails: false,
      //筛选
      filter: {
        time: "", //选择时间
        times: "", //选择时间
        class: "", //选择教室
        teacher: "", //选择老师
        date: "", //选择日期
        postList: [],
        keyword: "" //关键词
      },
      filterDetails: {
        isPing: "",
        pingList: []
      },
      // 表格数据
      tableList: {
        // 表格的列
        columns: [
          {
            fieldname: "群组名称",
            fieldstring: "a1",
            show: 1,
            custom: 1,
            ismethod: 1
          },
          {
            fieldname: "类型",
            fieldstring: "a2",
            show: 1,
            custom: 1
          },
          {
            fieldname: "群主",
            fieldstring: "a3",
            show: 1,
            custom: 1
          },
          {
            fieldname: "最近会话时间",
            fieldstring: "a4",
            show: 1,
            custom: 1
          },
          {
            fieldname: "消息数",
            fieldstring: "a5",
            show: 1,
            custom: 1
          },
          {
            fieldname: "启用状态",
            fieldstring: "a6",
            show: 1,
            custom: 1,
            isswitch: 1
          },
          {
            fieldname: "创建时间",
            fieldstring: "a7",
            show: 1,
            custom: 1
          }
        ],
        // 表格数据
        list: Array(8).fill(item),
        options: {
          errortip: "", //空页面提示内容
          mutiSelect: false, //是否显示多选
          RadioSelect: true, //是否显示多选
          issetting: false, //是否可以编辑列
          tableHeight: 0, //表格高度
          moduleName: "Educational", //当前页面所属于模块的名称****一个模块是唯一的
          ColumnName: "report_classReport" //当前页面的名称，通常与路由名称一致
        }
      },
      // 分页
      paging: {
        curPage: 1,
        pageSize: 10,
        pageTotal: 0
      },
      // 已选学员数据
      StudentData: {
        peopleList: [],
        choosePeopleList: [],
        groupList: [],
        groupId: "",
        positionList: [],
        positionId: "",
        keyword: "",
        tableList: {
          // 表格的列
          columns: [
            {
              fieldname: "姓名",
              fieldstring: "a1",
              show: 1,
              custom: 1,
              ismethod: 1
            },
            {
              fieldname: "学号",
              fieldstring: "a2",
              show: 1,
              custom: 1
            },
            {
              fieldname: "性别",
              fieldstring: "a3",
              show: 1,
              custom: 1
            },
            {
              fieldname: "主要联系电话",
              fieldstring: "a4",
              show: 1,
              custom: 1
            },
            {
              fieldname: "状态",
              fieldstring: "a5",
              show: 1,
              custom: 1
            },
            {
              fieldname: "班级名称",
              fieldstring: "a6",
              show: 1,
              custom: 1,
              isswitch: 1
            },
            {
              fieldname: "课程别",
              fieldstring: "a7",
              show: 1,
              custom: 1
            }
          ],
          // 表格数据
          list: [
            {
              a1: "菲菲菲",
              a2: "201908403894",
              a3: "女",
              a4: "18217189861",
              a5: "已入班",
              a6: "Wk美语",
              a7: "AS2"
            },
            {
              a1: "啊啊",
              a2: "asdasd",
              a3: "女",
              a4: "18217189861",
              a5: "已入班",
              a6: "Wk美语",
              a7: "AS2"
            },
            {
              a1: "分分",
              a2: "fewfew",
              a3: "女",
              a4: "18217189861",
              a5: "已入班",
              a6: "Wk美语",
              a7: "AS2"
            },
            {
              a1: "挨打的",
              a2: "fewfew",
              a3: "女",
              a4: "18217189861",
              a5: "已入班",
              a6: "Wk美语",
              a7: "AS2"
            },
            {
              a1: "菲菲菲",
              a2: "fewfew",
              a3: "女",
              a4: "18217189861",
              a5: "已入班",
              a6: "Wk美语",
              a7: "AS2"
            },
            {
              a1: "得的",
              a2: "fewfew",
              a3: "女",
              a4: "18217189861",
              a5: "已入班",
              a6: "Wk美语",
              a7: "AS2"
            }
          ],
          options: {
            errortip: "", //空页面提示内容
            mutiSelect: true, //是否显示多选
            issetting: false, //是否可以编辑列
            tableHeight: 300 //表格高度
          }
        },
        paging: {
          curPage: 1,
          pageSize: 30,
          pageTotal: 10
        }
      },
      ClassData: {
        peopleList: [],
        choosePeopleList: [],
        groupList: [],
        groupId: "",
        positionList: [],
        positionId: "",
        keyword: "",
        tableList: {
          // 表格的列
          columns: [
            {
              fieldname: "姓名",
              fieldstring: "a1",
              show: 1,
              custom: 1,
              ismethod: 1
            },
            {
              fieldname: "学号",
              fieldstring: "a2",
              show: 1,
              custom: 1
            },
            {
              fieldname: "性别",
              fieldstring: "a3",
              show: 1,
              custom: 1
            },
            {
              fieldname: "主要联系电话",
              fieldstring: "a4",
              show: 1,
              custom: 1
            },
            {
              fieldname: "状态",
              fieldstring: "a5",
              show: 1,
              custom: 1
            },
            {
              fieldname: "班级名称",
              fieldstring: "a6",
              show: 1,
              custom: 1,
              isswitch: 1
            },
            {
              fieldname: "课程别",
              fieldstring: "a7",
              show: 1,
              custom: 1
            }
          ],
          // 表格数据
          list: [
            {
              a1: "菲菲菲",
              a2: "201908403894",
              a3: "女",
              a4: "18217189861",
              a5: "已入班",
              a6: "Wk美语",
              a7: "AS2"
            },
            {
              a1: "啊啊",
              a2: "asdasd",
              a3: "女",
              a4: "18217189861",
              a5: "已入班",
              a6: "Wk美语",
              a7: "AS2"
            },
            {
              a1: "分分",
              a2: "fewfew",
              a3: "女",
              a4: "18217189861",
              a5: "已入班",
              a6: "Wk美语",
              a7: "AS2"
            },
            {
              a1: "挨打的",
              a2: "fewfew",
              a3: "女",
              a4: "18217189861",
              a5: "已入班",
              a6: "Wk美语",
              a7: "AS2"
            },
            {
              a1: "菲菲菲",
              a2: "fewfew",
              a3: "女",
              a4: "18217189861",
              a5: "已入班",
              a6: "Wk美语",
              a7: "AS2"
            },
            {
              a1: "得的",
              a2: "fewfew",
              a3: "女",
              a4: "18217189861",
              a5: "已入班",
              a6: "Wk美语",
              a7: "AS2"
            }
          ],
          options: {
            errortip: "", //空页面提示内容
            mutiSelect: false, //是否显示多选
            RadioSelect: true, //是否显示多选
            issetting: false, //是否可以编辑列
            tableHeight: 300 //表格高度
          }
        },
        paging: {
          curPage: 1,
          pageSize: 30,
          pageTotal: 10
        }
      },
      StaffData: {
        peopleList: [],
        choosePeopleList: [],
        groupList: [],
        groupId: "",
        positionList: [],
        positionId: "",
        keyword: "",
        tableList: {
          // 表格的列
          columns: [
            {
              fieldname: "姓名",
              fieldstring: "a1",
              show: 1,
              custom: 1,
              ismethod: 1
            },
            {
              fieldname: "学号",
              fieldstring: "a2",
              show: 1,
              custom: 1
            },
            {
              fieldname: "性别",
              fieldstring: "a3",
              show: 1,
              custom: 1
            },
            {
              fieldname: "主要联系电话",
              fieldstring: "a4",
              show: 1,
              custom: 1
            },
            {
              fieldname: "状态",
              fieldstring: "a5",
              show: 1,
              custom: 1
            },
            {
              fieldname: "班级名称",
              fieldstring: "a6",
              show: 1,
              custom: 1,
              isswitch: 1
            },
            {
              fieldname: "课程别",
              fieldstring: "a7",
              show: 1,
              custom: 1
            }
          ],
          // 表格数据
          list: [
            {
              a1: "菲菲菲",
              a2: "201908403894",
              a3: "女",
              a4: "18217189861",
              a5: "已入班",
              a6: "Wk美语",
              a7: "AS2"
            },
            {
              a1: "啊啊",
              a2: "asdasd",
              a3: "女",
              a4: "18217189861",
              a5: "已入班",
              a6: "Wk美语",
              a7: "AS2"
            },
            {
              a1: "分分",
              a2: "fewfew",
              a3: "女",
              a4: "18217189861",
              a5: "已入班",
              a6: "Wk美语",
              a7: "AS2"
            },
            {
              a1: "挨打的",
              a2: "fewfew",
              a3: "女",
              a4: "18217189861",
              a5: "已入班",
              a6: "Wk美语",
              a7: "AS2"
            },
            {
              a1: "菲菲菲",
              a2: "fewfew",
              a3: "女",
              a4: "18217189861",
              a5: "已入班",
              a6: "Wk美语",
              a7: "AS2"
            },
            {
              a1: "得的",
              a2: "fewfew",
              a3: "女",
              a4: "18217189861",
              a5: "已入班",
              a6: "Wk美语",
              a7: "AS2"
            }
          ],
          options: {
            errortip: "", //空页面提示内容
            mutiSelect: false, //是否显示多选
            RadioSelect: true, //是否显示多选
            issetting: false, //是否可以编辑列
            tableHeight: 300 //表格高度
          }
        },
        paging: {
          curPage: 1,
          pageSize: 30,
          pageTotal: 10
        }
      }
    };
  },
  components: {
    switchTableCont,
    levelTableCont,
    noBorderTableCont
  },
  created() {},
  methods: {
    handleSelectionRadio(val) {
      console.log(val);
    },
    handlePeopleChange() {
      this.selectStaff = true;
    },
    handleRemove(index, item, type) {
      if (type == "case") {
        this.specialCaseData.caseList.splice(index, 1);
        console.log(
          this.specialCaseData.caseList,
          this.specialCaseData.caseList.length
        );
      } else if (type == "people") {
        this.attendeesData.choosePeopleList.splice(index, 1);
      }
    },
    filterChoosePeople() {},
    peoplePageChange(v) {
      this.StudentData.paging.curPage = v;
      this.getWorkerList();
    },
    peopleSizeChange(v) {
      this.StudentData.paging.curPage = 1;
      this.StudentData.paging.pageSize = v;
      this.getWorkerList();
    },
    handleChoosePeopleChange(val) {
      this.StudentData.peopleList = val;
      console.log(val);
    },
    handleChoosePeople() {
      if (this.StudentData.peopleList.length > 0) {
        this.choosePeopleVis = false;
        this.StudentData.choosePeopleList = this.StudentData.choosePeopleList.concat(
          this.StudentData.peopleList
        );
      } else {
        this.$message({
          message: "请选择学员",
          type: "error"
        });
      }
      console.log(
        this.StudentData.choosePeopleList,
        "this.StudentData.choosePeopleList"
      );
    },
    clearData() {
      this.StudentData.groupId = "";
      this.StudentData.positionId = "";
      this.StudentData.keyword = "";
      this.choosePeopleVis = false;
    },
    clearData2() {
      this.ClassData.groupId = "";
      this.ClassData.positionId = "";
      this.ClassData.keyword = "";
      this.selectClass = false;
    },
    clearData3() {
      this.StudentData.groupId = "";
      this.StudentData.positionId = "";
      this.StudentData.keyword = "";
      this.selectStaff = false;
    },
    choosePeople() {
      this.choosePeopleVis = true;
    },
    handleStudent() {
      console.log("1");
    },
    handleCommand(command) {
      console.log(command);
      if (command == "serve") {
        this.createdServe = true;
      } else {
        // this.createdClass = true;
        this.selectClass = true;
      }
    },
    // 检索
    search() {},
    searchDetails() {},
    // 点击事件
    handleColumnChange(k, v, column) {
      console.log(k, v, column);
      if (v.fieldname == "群组名称") {
        this.seeGroup = true;
      }
    },

    // 编辑列编辑提交
    handSetting(v) {
      console.log(v, 121313);
    },
    // 页码变化
    curPageChange(v) {
      this.curPage = v;
    },
    // pageSize改变
    pageSizeChange(v) {
      this.curPage = 1;
    },
    // 关闭弹框
    handleClose(done) {
      done();
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs["auto_height_table"]) {
        this.tableList.options.tableHeight = this.$Tool.getTableHeight(
          this.$refs.auto_height_table.getBoundingClientRect().top + 52
        );
      }
    });
  }
};
</script>

<style lang="less">
.MessageQuery-container {
  .btn-container {
    position: absolute;
    right: 25px;
    top: 70px;
  }
  .icon-yw:before {
    color: #00a6ff;
  }
  .createdServe {
    .el-dialog__body {
      padding: 0;
    }
  }
  .addStu {
    .el-dialog__body {
      padding: 0;
    }
    .dialog-content {
      padding: 10px;
    }
  }
  .staff-edit {
    position: absolute;
    right: 50px;
    top: 8px;
  }
  .body-container {
    ul {
    }
    li {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .label {
        font-size: 14px;
        width: 80px;
        color: rgba(170, 170, 170, 1);
        line-height: 20px;
      }
      .content {
        flex: 1;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: rgba(36, 53, 106, 1);
        line-height: 20px;
        img {
          width: 44px;
          height: 44px;
          margin-right: 12px;
          border-radius: 50%;
        }
        .img-list {
          display: flex;
          align-items: center;
          width: 30%;
          span {
            margin-right: 10px;
            display: inline-block;
            width: 30px;
          }
        }
        .container {
          display: flex;
          align-items: center;
          width: 80%;
          overflow: hidden;
        }
      }
      .contentUser {
        justify-content: flex-start;
        width: 88%;
      }
    }
  }
  .seeAllPeople {
    .el-dialog__body {
      padding: 18px;
    }
  }
  .people-container {
    img {
      width: 44px;
      height: 44px;
      margin-right: 12px;
      border-radius: 50%;
    }
    p {
      font-size: 14px;
      color: rgba(36, 53, 106, 1);
      line-height: 20px;
      margin-bottom: 12px;
    }
    .people-info {
      display: flex;
      align-items: center;
      padding: 12px 0;
    }
    .teacher-container {
      margin-top: 12px;
      display: flex;
      align-items: center;
      span {
        margin-right: 12px;
      }
      margin-bottom: 25px;
    }
    .user-container {
      flex-wrap: wrap;
      display: flex;
      span {
        margin-right: 12px;
      }
      align-items: center;
    }
  }
}
</style>
