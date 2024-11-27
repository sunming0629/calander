<!--
 * Copyright(C) Beijing Oil Trading Interconnection Technology Co., Ltd. 
 * @Author: sunming
 * @Date: 2024-08-12 17:23:57
 * @LastEditors: sunming
 * @LastEditTime: 2024-11-27 10:22:11
 * @Description: 
-->
<template>
  <div @click="calendarChange(false)"
    class="bipartiteBoard-list-container table-auto-height"
    :class="{ 'vab-table-fullscreen': tableFullscreen }">
    <div class="el-table">
      <div class="bipartiteBoard-box">
        <div class="picker-box">
          <div class="header">
            <div class="title">{{ queryForm.yearValue }}-{{ queryForm.monthValue }}</div>
            <div class="custom">
              <el-select v-model="queryForm.yearValue"
                class="yearValue"
                filterable
                @change="yearChange()">
                <el-option v-for="(item, index) in yearValueList"
                  :key="index"
                  :label="item.name"
                  :value="item.value" />
              </el-select>

              <div class="monthValue-box">
                <el-button type="primary"
                  plain
                  @click="nextMouth()">
                  <i class="iconfont icon-shangyiyehoutuifanhui"></i>
                </el-button>
                <el-select v-model="queryForm.monthValue"
                  class="monthValue"
                  filterable
                  @change="monthChange()">
                  <el-option v-for="(item, index) in monthValueList"
                    :key="index"
                    :label="item.name"
                    :value="item.value" />
                </el-select>
                <el-button type="primary"
                  plain
                  @click="prevMouth()">
                  <i class="iconfont icon-xiayiyeqianjinchakangengduo"></i>
                </el-button>
              </div>

              <el-button @click="nowMonth">当月</el-button>
            </div>
          </div>
          <div class="body">
            <el-calendar v-model="queryForm.calendarDate">
              <template #date-cell="{ data }">
                <div class="calendar-box"
                  :class="queryForm.seeDay == `${data.day.split('-').slice(1).join('-')}`
                    ? 'DD'
                    : ''
                    "
                  @click.stop="calendarChange(data)">
                  <div class="item-day"
                    :class="data.day == queryForm.nowDayDanger &&
                      queryForm.seeDay !== `${data.day.split('-').slice(1).join('-')}`
                      ? 'today'
                      : ''
                      ">
                    <div class="addNewItem"
                      @click.stop="
                      (newItemForm = {
                        remind: false,
                      }),
                        (newItemForm.scheduleDate = data.day),
                        (title = '添加新的日程'),
                        (addNewDialogVisible = true)
                        ">
                      <el-icon :size="15">
                        <Plus />
                      </el-icon>
                    </div>
                    <span class="dayOrNo">
                      <span class="day">
                        {{ data.day.split("-").slice(2).join("-") }}
                      </span>
                      日
                    </span>
                  </div>
                  <div class="category-box">
                    <!-- 取数组前两位 -->
                    <div v-for="(item, index) in getCalendarList(data)"
                      :key="index"
                      class="item">
                      <customer-box v-if="
                        queryForm.seeDay != `${data.day.split('-').slice(1).join('-')}`
                      "
                        :background="item.background"
                        :finished="item.status == 0 ? false : true"
                        :color="'#000000'"
                        font-size="10px"
                        width="180px"
                        height="20px"
                        :name="item.title" />
                      <el-popover v-if="
                        queryForm.seeDay == `${data.day.split('-').slice(1).join('-')}`
                      "
                        placement="right"
                        :width="200"
                        trigger="click"
                        :show-arrow="false"
                        popper-class="customer-popever">
                        <template #reference>
                          <customer-box :color="'#000000'"
                            :background="item.background"
                            :finished="item.status == 0 ? false : true"
                            font-size="
                            10px"
                            width="180px"
                            height="20px"
                            :name="item.title" />
                        </template>
                        <template #default>
                          <div class="itinerary-view"
                            :style="`background:hsla(${item.background},70%,80%,0.2)`">
                            <div class="itinerary-action">
                              <el-icon size="16"
                                v-if="item.status == 0"
                                @click="editItem(item, 'update')">
                                <Check />
                              </el-icon>
                              <el-icon size="16"
                                v-if="item.status == 0"
                                @click="editItem(item, 'edit')">
                                <EditPen />
                              </el-icon>
                              <el-popconfirm title="确认删除?"
                                confirm-button-text="是"
                                cancel-button-text="否"
                                @confirm="deleteItem(item)">
                                <template #reference>
                                  <el-icon size="16">
                                    <Delete />
                                  </el-icon>
                                </template>
                              </el-popconfirm>
                            </div>
                            <el-form>
                              <el-form-item>
                                <div class="itinerary-details">
                                  <span class="itinerary-title">{{ item.title }} </span>
                                  <span class="itinerary-content">{{ item.content }}
                                  </span>
                                </div>
                              </el-form-item>
                              <!-- <el-form-item class="previewTimeLable">
                                <el-date-picker class="previewTime"
                                  v-model="item.remindTime"
                                  type="datetime"
                                  :disabled="true"
                                  value-format="YYYY-MM-DD HH:mm:ss"
                                  placeholder="定时提醒时间" />
                              </el-form-item> -->
                            </el-form>
                          </div>
                        </template>
                      </el-popover>
                    </div>
                  </div>
                </div>
              </template>
            </el-calendar>
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-model="addNewDialogVisible"
      :title="title"
      width="500"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <div class="dialog-content">
        <el-form ref="formRef"
          :model="newItemForm"
          :rules="rules"
          label-width="auto"
          style="max-width: 600px">
          <el-form-item prop="title">
            <el-input class="newItemTitle"
              v-model="newItemForm.title"
              placeholder="请输入日程标题"
              oninput="if(value.length > 36) value=value.slice(0, 36)" />
          </el-form-item>
          <el-form-item style="margin-top: 0">
            <el-input class="newItemContent"
              v-model="newItemForm.content"
              type="textarea"
              oninput="if(value.length > 255) value=value.slice(0, 225)"
              show-word-limit
              :autosize="{ minRows: 4, maxRows: 4 }"
              placeholder="日程内容" />
          </el-form-item>
          <!-- <el-form-item>
            <el-checkbox v-model="newItemForm.remind"
              @change="changeRemind"
              name="type">
              是否提醒
            </el-checkbox>
            <el-date-picker class="newItemTime"
              v-if="newItemForm.remind"
              v-model="newItemForm.remindTime"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetime"
              :default-time="defaultTime"
              placeholder="定时提醒时间" />
            <div class="timeValue"
              v-if="timeValue">定时提醒时间不能为空</div>
          </el-form-item>
          <el-form-item v-if="newItemForm.remind">
            <el-radio-group v-model="newItemForm.remindMode">
              <el-radio-button :value="1">邮件</el-radio-button>
              <el-radio-button :value="2">短信</el-radio-button>
            </el-radio-group>
            <el-input class="newItemContent remindAddress"
              v-model="newItemForm.remindAddress"
              placeholder="请输入提醒方式地址" />
            <div class="timeValue"
              v-if="addressValue">提醒方式地址不能为空</div>
          </el-form-item> -->
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel()">取消</el-button>
          <el-button type="primary"
            @click="addNewItem"
            v-if="title == '添加新的日程'">
            添加
          </el-button>
          <el-button type="primary"
            @click="saveItem"
            v-if="title == '修改日程'">
            更新日程
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { Edit, Plus, Check, EditPen, Delete } from '@element-plus/icons-vue'
import { ref, inject, isRef, watch, defineEmits, reactive, onMounted } from "vue";
import CustomerBox from "../components/customerBox.vue";
import dayjs from "dayjs";
import { ElMessage } from "element-plus";
import { getScheduleList, addSchedule, updateSchedule, deleteSchedule } from '../api/index'
const loading = ref<boolean>(false);
const queryForm = reactive<any>({});
const tableFullscreen = ref<boolean>(false);
const title = ref<any>("");
const formRef = ref();
const defaultTime = new Date(2000, 1, 1, 12, 0, 0)
const monthData = ref<any>({
  calendar: {},
  card_statistics: {},
});

const rules = ref<any>({
  title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
});

const yearValueList = ref<any>([]);
const monthValueList = ref<any>([]);
const newItemForm = ref<any>({
  remind: false,
});
const remind = ref(false);
const timeValue = ref(false);
const addressValue = ref(false);
const previewForm = ref<any>({
  time: "2023-01-13 00:00:00",
});
const addNewDialogVisible = ref<boolean>(false);

// 字典
const getDict = async () => {
  getDateList();
};

const getDateList = () => {
  // 2020年到2090年下拉值生成
  yearValueList.value = [];
  for (let i = 2020; i < 2091; i++) {
    yearValueList.value.push({
      value: i,
      name: `${i}年`,
    });
  }

  // 1月到12月下拉值生成
  monthValueList.value = [];
  for (let i = 1; i < 13; i++) {
    monthValueList.value.push({
      value: `00${i}`.slice(-2),
      name: `${i}月`,
    });
  }
};

const getList = () => {
  loading.value = true;
  monthData.value.calendar = {};
  const date = new Date(queryForm.calendarDate);

  queryForm.startDate = dayjs(new Date(date.getFullYear(), date.getMonth(), 1)).format(
    "YYYY-MM-DD"
  );
  queryForm.endDate = dayjs(new Date(date.getFullYear(), date.getMonth() + 1, 0)).format(
    "YYYY-MM-DD"
  );
  getScheduleList(queryForm).then((res: any) => {
    if (res.code == 20000) {
      res.data.forEach((item: any) => {
        item.background = ~~(360 * Math.random());
        if (monthData.value.calendar[dayjs(item.scheduleDate).format("DD")]) {
          monthData.value.calendar[dayjs(item.scheduleDate).format("DD")].push(item);
        } else {
          monthData.value.calendar[dayjs(item.scheduleDate).format("DD")] = [];
          monthData.value.calendar[dayjs(item.scheduleDate).format("DD")].push(item);
        }
      });
    }
    loading.value = false;
  });
};

const getInfo = () => {
  loading.value = true;
};

const getCalendarList = (data: any) => {
  if (data.day.split("-")[1] == queryForm.monthValue) {
    const nowDay: any = data.day.split("-").slice(2).join("-");
    const returnList: any = monthData.value.calendar[nowDay];
    return returnList;
  }
  return [];
};

// 获取当前日期
const getNowDate = () => {
  const date = new Date();
  queryForm.yearValue = date.getFullYear();
  queryForm.monthValue = `00${date.getMonth() + 1}`.slice(-2);
  // 当天日期yyyy-mm-dd
  queryForm.nowDayDanger = `${queryForm.yearValue}-${queryForm.monthValue}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
  queryForm.calendarDate = new Date();
};

const calendarChange = (data: any) => {
  // 日期点击效果
  if (data != false) {
    queryForm.seeDay = data.day.split("-").slice(1).join("-");
    queryForm.day = data.day.split("-").slice(2).join("-");
    queryForm.date = data.day;
  } else {
    queryForm.seeDay = "";
    queryForm.day = "";
    queryForm.date = "";
  }
};

const yearChange = () => {
  // 年份改变
  monthChange();
};

const nowMonth = () => {
  // 当月
  const date = new Date();
  queryForm.yearValue = date.getFullYear();
  queryForm.monthValue = `00${date.getMonth() + 1}`.slice(-2);
  monthChange();
};

const nextMouth = () => {
  // 上个月
  if (queryForm.monthValue == '01') {
    queryForm.yearValue = queryForm.yearValue - 1
    queryForm.monthValue = '12'
    monthChange();
  } else {
    queryForm.monthValue--;
    monthChange();
  }
};

const prevMouth = () => {
  // 下个月
  if (queryForm.monthValue == '12') {
    queryForm.yearValue = queryForm.yearValue + 1
    queryForm.monthValue = '1'
    monthChange();
  } else {
    queryForm.monthValue++;
    monthChange();
  }
};

const monthChange = () => {
  // 月份改变
  queryForm.monthValue = `00${queryForm.monthValue}`.slice(-2);
  queryForm.seeDay = "";
  queryForm.day = "";
  queryForm.calendarDate = `${queryForm.yearValue}-${queryForm.monthValue}-01`;
  const stringDate = new Date(queryForm.calendarDate);
  queryForm.startDate = dayjs(
    new Date(stringDate.getFullYear(), stringDate.getMonth(), 1)
  ).format("YYYY-MM-DD");
  queryForm.endDate = dayjs(
    new Date(stringDate.getFullYear(), stringDate.getMonth() + 1, 0)
  ).format("YYYY-MM-DD");
  getList();
};

//新增行程
const addNewItem = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      if (newItemForm.value.remind && newItemForm.value.remindTime == null) {
        timeValue.value = true;
        return;
      }
      if (newItemForm.value.remind && newItemForm.value.remindAddress == null) {
        addressValue.value = true;
        return;
      }
      newItemForm.value.status = 0;
      newItemForm.value.scheduleDate =
        dayjs(newItemForm.value.scheduleDate).format("YYYY-MM-DD") + " 00:00:00";
      addSchedule(newItemForm.value).then((res: any) => {
        if (res.code == 20000) {
          ElMessage.success("添加成功");
          getList();
        } else {
          ElMessage.error(res.msg);
        }
      });
      newItemForm.value.remind = false;
      timeValue.value = false;
      addressValue.value = false;
      addNewDialogVisible.value = false;
    }
  });
};

//保存修改并更新日程
const saveItem = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      if (newItemForm.value.remind && newItemForm.value.remindTime == null) {
        timeValue.value = true;
        return;
      }
      if (newItemForm.value.remind && newItemForm.value.remindAddress == null) {
        addressValue.value = true;
        return;
      }
      newItemForm.value.status = 0;
      newItemForm.value.scheduleDate =
        dayjs(newItemForm.value.scheduleDate).format("YYYY-MM-DD") + " 00:00:00";
      updateSchedule(newItemForm.value).then((res: any) => {
        if (res.code == 20000) {
          ElMessage.success("更新成功");
          getList();
        } else {
          ElMessage.error(res.msg);
        }
      });
      remind.value = false;
      timeValue.value = false;
      addressValue.value = false;
      addNewDialogVisible.value = false;
    }
  });
};

//修改行程
const editItem = (data: any, type: any) => {
  title.value = "修改日程";
  newItemForm.value = {};
  newItemForm.value = data;
  if (type == "edit") {
    addNewDialogVisible.value = true;
    if (data.remindTime && data.remindTime.length > 0) {
      newItemForm.value.remind = true;
    }
  } else {
    // newItemForm.value.scheduleDate = dayjs(newItemForm.value.scheduleDate).format(
    //   "YYYY-MM-DD"
    // );
    newItemForm.value.status = 1;
    updateSchedule(newItemForm.value).then((res: any) => {
      if (res.code == 20000) {
        ElMessage.success("更新成功");
        getList();
      } else {
        ElMessage.error(res.msg);
      }
    }).catch((err: any) => {
      newItemForm.value.status = 0;
    });
  }
};

//取消弹窗
const cancel = () => {
  newItemForm.value.remind = false;
  addNewDialogVisible.value = false;
  timeValue.value = false;
  addressValue.value = false;
};

//修改是否提醒状态
const changeRemind = () => {
  newItemForm.value.remindTime = null;
  newItemForm.value.remindAddress = null;
  if (newItemForm.value.remind) {
    newItemForm.value.remindMode = 1
  } else {
    newItemForm.value.remindMode = null
  }
};

const deleteItem = (item: any) => {
  deleteSchedule({ id: item.id }).then((res: any) => {
    if (res.code == 20000) {
      ElMessage.success("删除成功");
      getList();
    } else {
      ElMessage.error(res.msg);
    }
  });
};

onMounted(() => {
  getDict();
  getNowDate();
  getList();
});
</script>
<style lang="scss" scoped>
@import "./css/calander.scss";
</style>
<style lang="scss">
.customer-popever {
  width: 300px !important;
  background: #fff !important;
  padding: 0 0 !important;
  border-radius: 10px !important;
}

.newItemTitle .el-input__inner::placeholder {
  font-weight: bold;
  font-size: 16px;
}

.newItemTitle .el-input__inner {
  font-weight: bold;
  font-size: 16px;
}

.newItemTitle .el-input__wrapper {
  box-shadow: none;
}

.newItemContent .el-textarea__inner {
  box-shadow: none;
  border-bottom: 1px solid var(--el-border-color-light);
  border-radius: 0%;
}

.newItemContent .el-input__wrapper {
  box-shadow: none;
  border-bottom: 1px solid var(--el-border-color-light);
  border-radius: 0%;
}

.newItemTime {
  width: 250px !important;
  margin-left: 30px;
}

.remindAddress {
  margin-top: 10px;
}

.timeValue {
  font-size: 12px;
  color: #f56c6c;
}

.newItemTime .el-input__wrapper {
  box-shadow: none;
}

.previewTime .el-input__wrapper {
  box-shadow: none !important;
  width: 250px !important;
  background-color: transparent !important;
  padding: 0 0 !important;
}

.previewTimeLable {
  margin-bottom: 0 !important;
}

.itinerary-view {
  padding: 10px 10px;
}

.itinerary-details {
  display: flex;
  flex-direction: column;
}

.itinerary-title {
  font-weight: bold;
  font-size: 16px;
  width: 180px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.itinerary-content {
  width: 280px;
  font-weight: normal;
  color: #666;
  font-size: 14px;
}

.itinerary-action {
  float: right;
  position: relative;
  z-index: 99999;

  i {
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
