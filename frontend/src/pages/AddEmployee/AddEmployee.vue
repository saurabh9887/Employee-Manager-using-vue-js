<script setup>
import { onMounted, reactive, ref } from "vue";
import "./AddEmployee.scss";
import { useRouter } from "vue-router";
import axios from "axios";

const form = reactive({
  id: null,
  name: "",
  mobileNumber: null,
  designation: "",
  state: "",
  city: "",
  talukas: [],
  skills: [],
  gender: "",
  address: "",
  salary: null,
  lastCompany: "",
});

// Validation variable
const validateId = ref(false);
const validateName = ref(false);
const validateMobile = ref(false);
const validateDesignation = ref(false);
const validateState = ref(false);
const validateTaluka = ref(false);
const validateCity = ref(false);

// Routes
const router = useRouter();

// Arrays and Ids
const states = ref([]);
const stateId = ref("");
const cities = ref([]);
const cityId = ref("");
const AllTalukas = ref([]);

// Toggle btn values
const toggleState = ref(false);
const toggleCity = ref(false);
const toggleTaluka = ref(false);

// New values to add
const newStateToAdd = ref("");
const newCityToAdd = ref("");
const newTalukaToAdd = ref("");

// New values to add in object form
const stateObj = reactive({
  name: newStateToAdd,
});

const cityObj = reactive({
  name: newCityToAdd,
  stateId: stateId,
});

const talukaObj = reactive({
  name: newTalukaToAdd,
  cityId: cityId,
});

const handleSubmit = async () => {
  // Set validation flags
  validateId.value = !form.id;
  validateName.value = !form.name;
  validateMobile.value = !form.mobileNumber;
  validateDesignation.value = !form.designation;
  validateState.value = !form.state;
  validateCity.value = !form.city;
  validateTaluka.value = form.talukas.length === 0;

  // If any validation flag is true, stop the submission
  if (
    validateId.value ||
    validateName.value ||
    validateMobile.value ||
    validateDesignation.value ||
    validateState.value ||
    validateCity.value ||
    validateTaluka.value
  ) {
    alert("Enter all the required fields");
    return;
  }

  if (form.id < 1) {
    alert("The id should not be negative value");
    return;
  }

  if (form.salary < 0) {
    alert("Salary should be be lesser than zero");
    return;
  }

  try {
    const res = await axios.post("http://localhost:3000/api/emp/add", form);
    console.log(res.data);
    router.push("/");
    // console.log(form);
  } catch (error) {
    console.log(error);
  }
};

const handleStateChange = async () => {
  try {
    cities.value = [];
    AllTalukas.value = [];
    const selectedStateName = form.state;
    const selectedState = states.value.find(
      (state) => state.name === selectedStateName
    );
    // Below it is just checking true or false, like if the selectedState is there or not
    // if it is there then set it to id or empty string.
    stateId.value = selectedState ? selectedState._id : "";

    const res = await axios.get("http://localhost:3000/api/city", {
      params: { stateId: stateId.value },
    });

    cities.value = res.data;

    console.log(cities.value);

    // console.log("Selected State ID:", stateId.value);
    // console.log(form.state);
    // You can now use stateId.value as needed in your code
  } catch (error) {
    console.log(error);
  }
};

const handleCityChange = async () => {
  try {
    const selectedCityName = form.city;
    const selectedCity = cities.value.find(
      (item) => item.name === selectedCityName
    );
    cityId.value = selectedCity ? selectedCity._id : "";
    const res = await axios.get("http://localhost:3000/api/taluka", {
      params: { cityId: cityId.value },
    });
    AllTalukas.value = res.data;
    console.log(AllTalukas.value);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

// New added values

const handleNewState = async () => {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/state/add",
      stateObj
    );
    const newStateVal = res.data;
    states.value.push(newStateVal);
    toggleState.value = !toggleState.value;
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

const handleNewCity = async () => {
  try {
    const res = await axios.post("http://localhost:3000/api/city/add", cityObj);
    const newCityVal = res.data;
    cities.value.push(newCityVal);
    // console.log(stateId.value);
    toggleCity.value = !toggleCity.value;
  } catch (error) {
    console.log(error);
  }
};

const handleNewTaluka = async () => {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/taluka/add",
      talukaObj
    );
    const newTalukaVal = res.data;
    AllTalukas.value.push(newTalukaVal);
    console.log(cityId.value);
    toggleTaluka.value = !toggleTaluka.value;
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/state");
    states.value = res.data;
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div :class="{ 'blur-background': toggleState }" class="addEmployee">
    <div class="addEmployeeWrapper">
      <h2>Add Employee</h2>
      <form @submit.prevent="handleSubmit">
        <div class="empInfo">
          <label class="required">Employee Id:</label>
          <input
            type="number"
            placeholder="Add Employee Id"
            v-model="form.id"
          />
          <label class="reqMsg" v-if="validateId">This field is required</label>
        </div>
        <div class="empInfo">
          <label class="required">Employee Name:</label>
          <input
            type="text"
            placeholder="Add Employee Name"
            v-model="form.name"
          />
          <label class="reqMsg" v-if="validateName"
            >This field is required</label
          >
        </div>
        <div class="empInfo">
          <label class="required">Employee Mobile Number:</label>
          <input
            type="number"
            placeholder="Mobile Number"
            v-model="form.mobileNumber"
          />
          <label class="reqMsg" v-if="validateMobile"
            >This field is required</label
          >
        </div>
        <div class="empInfo">
          <label class="required">Designation</label>
          <select v-model="form.designation">
            <option value="">Select Designation</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Senior Software Engineer">
              Senior Software Engineer
            </option>
            <option value="Product Manager">Product Manager</option>
            <option value="AI/ML Developer">AI/ML Developer</option>
            <option value="Dot Net Developer">Dot Net Developer</option>
          </select>
          <label class="reqMsg" v-if="validateDesignation"
            >This field is required</label
          >
        </div>
        <div class="empInfo">
          <label>Salary:</label>
          <input
            type="number"
            placeholder="Enter salary"
            v-model="form.salary"
          />
        </div>
        <div class="empInfo">
          <label>Last Company Name:</label>
          <input
            type="text"
            placeholder="Last Company Name"
            v-model="form.lastCompany"
          />
        </div>
        <div class="empInfo">
          <label>Skills:</label>
          <div className="skills">
            <label>
              <input type="checkbox" v-model="form.skills" value="Javascript" />
              JavaScript
            </label>
            <label>
              <input type="checkbox" v-model="form.skills" value="React JS" />
              React JS
            </label>
            <label>
              <input type="checkbox" v-model="form.skills" value="Node JS" />
              Node.js
            </label>
            <label>
              <input type="checkbox" v-model="form.skills" value="MongoDB" />
              MongoDB
            </label>
            <label>
              <input type="checkbox" v-model="form.skills" value="Express JS" />
              Express js
            </label>
          </div>
        </div>
        <div class="empInfo">
          <label>Gender</label>
          <div className="select">
            <label>
              <input
                type="radio"
                name="gender"
                v-model="form.gender"
                value="male"
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                v-model="form.gender"
                value="female"
              />
              Female
            </label>
          </div>
        </div>
        <div class="empInfo">
          <label>Address</label>
          <input type="textarea" placeholder="Address" v-model="form.address" />
        </div>
        <div class="empInfo">
          <div class="top">
            <label class="required">Select or Enter the state: </label>
            <svg
              @click="toggleState = !toggleState"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="{1.5}"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </div>
          <select v-model="form.state" @change="handleStateChange">
            <option value="" disabled selected>Select State</option>
            <option v-for="(x, index) in states" :key="index">
              {{ x.name }}
            </option>
          </select>
          <label class="reqMsg" v-if="validateState"
            >This field is required</label
          >
        </div>
        <div class="empInfo">
          <div class="top">
            <label class="required">Select City:</label>
            <svg
              @click="toggleCity = !toggleCity"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="{1.5}"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </div>
          <select v-model="form.city" @change="handleCityChange">
            <option disabled selected value="">Select city</option>
            <option v-for="(x, index) in cities" :key="index">
              {{ x.name }}
            </option>
          </select>
          <label class="reqMsg" v-if="validateCity"
            >This field is required</label
          >
        </div>
        <div class="empInfo">
          <div class="top">
            <label class="required">Select Taluka:</label>

            <svg
              @click="toggleTaluka = !toggleTaluka"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="{1.5}"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </div>
          <select multiple v-model="form.talukas">
            <option value="" disabled selected>Select Taluka</option>
            <option v-for="(x, index) in AllTalukas" :key="index">
              {{ x.name }}
            </option>
          </select>
          <label class="reqMsg" v-if="validateTaluka"
            >This field is required</label
          >
        </div>
        <button type="submit">Add Employee</button>
      </form>
      <div class="popUp" v-if="toggleState">
        <h2>Enter your state</h2>
        <input
          v-model="newStateToAdd"
          type="text"
          placeholder="Enter your state"
        />
        <button @click="handleNewState" class="btn">Add state</button>
      </div>
      <div class="popUp" v-if="toggleCity">
        <h2>Enter your City</h2>
        <input
          v-model="newCityToAdd"
          type="text"
          placeholder="Enter your City"
        />
        <button @click="handleNewCity" class="btn">Add City</button>
      </div>
      <div class="popUp" v-if="toggleTaluka">
        <h2>Enter your Taluka</h2>
        <input
          v-model="newTalukaToAdd"
          type="text"
          placeholder="Enter your Taluka"
        />
        <button @click="handleNewTaluka" class="btn">Add Taluka</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reqMsg {
  color: rgb(215, 54, 54);
  font-size: 15px;
  font-weight: 400;
  margin: 5px;
}
</style>
