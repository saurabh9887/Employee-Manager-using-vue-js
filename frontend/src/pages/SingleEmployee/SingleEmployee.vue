<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import "./SingleEmployee.scss";

const route = useRoute();
const empId = route.params.id;
const singleEmp = ref({});

console.log(singleEmp);

onMounted(async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/emp/${empId}`);
    singleEmp.value = res.data;
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div class="singleEmp">
    <div class="singleEmpWrapper">
      <div class="empData">
        <label>Id:</label>
        <span>{{ singleEmp.id }}</span>
      </div>
    </div>
    <div class="singleEmpWrapper">
      <div class="empData">
        <label>Name:</label>
        <span>{{ singleEmp.name }}</span>
      </div>
    </div>
    <div class="singleEmpWrapper">
      <div class="empData">
        <label>Mobile Number:</label>
        <span>{{ singleEmp.mobileNumber }}</span>
      </div>
    </div>
    <div class="singleEmpWrapper">
      <div class="empData">
        <label>Designation:</label>
        <span>{{ singleEmp.designation }}</span>
      </div>
    </div>
    <div class="singleEmpWrapper">
      <div class="empData">
        <label>Skills:</label>
        <span>{{ singleEmp.skills }}</span>
      </div>
    </div>
    <div class="singleEmpWrapper">
      <div class="empData">
        <label>Salary:</label>
        <span>{{ singleEmp.salary }}</span>
      </div>
    </div>
    <div class="singleEmpWrapper">
      <div class="empData">
        <label>Last Company:</label>
        <span>{{ singleEmp.lastCompany }}</span>
      </div>
    </div>
    <div class="singleEmpWrapper">
      <div class="empData">
        <label>Gender:</label>
        <span>{{ singleEmp.gender }}</span>
      </div>
    </div>
    <div class="singleEmpWrapper">
      <div class="empData">
        <label>State:</label>
        <span>{{ singleEmp.state }}</span>
      </div>
    </div>
    <div class="singleEmpWrapper">
      <div class="empData">
        <label>City:</label>
        <span>{{ singleEmp.city }}</span>
      </div>
    </div>
    <div class="singleEmpWrapper">
      <div class="empData">
        <label>Talukas:</label>
        <span>{{ singleEmp.talukas }}</span>
      </div>
    </div>
    <div class="singleEmpWrapper">
      <div class="empData">
        <label>Address:</label>
        <span>{{ singleEmp.address }}</span>
      </div>
    </div>
  </div>
</template>
