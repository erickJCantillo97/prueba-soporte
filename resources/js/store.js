import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"; // Asegúrate de tener axios instalado
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
Vue.use(Vuex);

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    iconColor: "white",
    customClass: {
        popup: "colored-toast",
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
});

export default new Vuex.Store({
    state: {
        tasks: [], // Estado inicial para las tareas
        users: [], // Estado inicial para los usuarios
    },
    mutations: {
        SET_TASKS(state, tasks) {
            state.tasks = tasks;
        },
        SET_USERS(state, users) {
            state.users = users;
        },
        ADD_TASK(state, task) {
            state.tasks.push(task);
        },
        UPDATE_TASK(state, updatedTask) {
            const index = state.tasks.findIndex((t) => t.id === updatedTask.id);
            if (index !== -1) {
                Vue.set(state.tasks, index, updatedTask);
            }
        },
        DELETE_TASK(state, taskId) {
            state.tasks = state.tasks.filter((t) => t.id !== taskId);
        },
    },
    actions: {
        getTasks({ commit }, state) {
            
            axios
                .get("/tasks?state="+ state)
                .then((response) => {
                    commit("SET_TASKS", response.data);
                })
                .catch((error) => {
                    console.error("Error fetching tasks:", error);
                });
        },
        getUsers({ commit }, ) {
            axios
                .get("/users")
                .then((response) => {
                    commit("SET_USERS", response.data);
                    // $swal('Hello Vue world!!!');
                })
                .catch((error) => {
                    console.error("Error fetching users:", error);
                });
        },
        async addTask({ dispatch, commit }, task) {
            await axios.post("/tasks", task);
            dispatch("getTasks");
            Toast.fire({
                icon: "success",
                title: "Task added successfully",
            });
        },
        async updateTask({ dispatch, commit }, task) {
            console.log(task.id);
            await axios.put(`/tasks/${task.id}`, task);
            dispatch("getTasks");
            Toast.fire({
                icon: "warining",
                title: "Task updated successfully",
            });
        },
        async addUser({ dispatch }, user) {
            await axios.post("/users", user);
            dispatch("getUsers");
            Toast.fire({
                icon: "error",
                title: "User added successfully",
            });
        },
        async completeTask({ dispatch }, task) {
            await axios.put(`/completeTasks/${task}`);
            dispatch("getTasks");
        },
        async deleteTask({ dispatch }, taskId) {
            await axios.delete(`/tasks/${taskId}`);
            Toast.fire({
                icon: "error",
                title: "Task deleted successfully",
            });
            dispatch("getTasks");
        },
    },
    getters: {
        tasks: (state) => state.tasks,
    },
});
