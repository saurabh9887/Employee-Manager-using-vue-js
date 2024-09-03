<script setup>
import { onMounted, reactive } from "vue";
import "./Home.scss";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const emp = ref([]);

// const navToView = ()=>{
//   router.push(`/${id}`)
// }

const handleDelete = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:3000/api/emp/${id}`);
    router.push("/");
    const responce = await axios.get("http://localhost:3000/api/emp");
    emp.value = responce.data;
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/emp");
    emp.value = res.data;
  } catch (error) {
    console.log(error);
  }
});

// console.log(emp);
</script>

<template>
  <div class="home">
    <div class="home-wrapper">
      <table>
        <thead>
          <tr>
            <th>Emp Id</th>
            <th>Emp Name</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>State</th>
            <th>City</th>
            <th>Talukas</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(x, index) in emp" :key="index">
            <td>{{ x.id }}</td>
            <td>{{ x.name }}</td>
            <td>{{ x.mobileNumber }}</td>
            <td>{{ x.designation }}</td>
            <td>{{ x.state }}</td>
            <td>{{ x.city }}</td>
            <td>{{ x.talukas.join(", ") }}</td>
            <td>
              <div class="btn">
                <button @click="router.push(`/${x._id}`)" class="view">
                  View
                </button>
                <button @click="router.push(`/edit/${x._id}`)" class="edit">
                  Edit
                </button>
                <button @click="handleDelete(x._id)" class="delete">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
