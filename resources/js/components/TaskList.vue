<template>
    <div class="container mt-5 h-100">

        <div class="container">
            <form @submit.prevent="addTask" class="row">
                {{ taskEditId }}
                <div class="form-group col">
                    <label for="" class="font-weight-bold">Title</label>
                    <input v-model="newTask.title" class="form-control" placeholder="Task Title" required>
                </div>
                <div class="form-group col">
                    <div class="d-flex justify-content-between align-items-center ">
                        <label for="" class="font-weight-bold">Description</label>

                    </div>
                    <input v-model="newTask.description" class="form-control" placeholder="Task Description" required>
                </div>
                <div class="form-group col">
                    <div class="d-flex justify-content-between align-items-center ">
                        <label for="" class="font-weight-bold">Assigned User</label>
                        <a href="#" @click="showModal = true" class="btn btn-outline-primary btn-sm ">+</a>
                    </div>
                    <select name="" v-model="newTask.user" required class="form-control" :disabled="editMode">
                        <option value="" disabled>Select Usuario</option>
                        <option :value="user.id" v-for="user in users">{{ user.name }}</option>
                    </select>
                    <!-- <input v-model="newTask.user"  placeholder="Assigned User" required> -->
                </div>
                <button type="submit" v-if="!editMode" class="btn btn-success btn-block">Add Task</button>
                <button type="submit" v-else class="btn btn-warning btn-block">Edit Task</button>
            </form>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-4">
            <h3 class="text-start">Task List</h3>
            <div class="d-flex ">
                <select type="text" class="form-control mx-2" @change="filtering">
                    <option value="">All</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                </select>
                <button class="btn btn-primary btn-sm" @click="addNewTask">New</button>
            </div>
        </div>
        <ul class="list-group mb-4 overflow-auto" style="height: 400px">
            <li v-for="(task, index) in tasks" :key="task.id"
                class="list-group-item d-flex justify-content-between align-items-center ">
                <div>
                    <h6 class="">{{ index + 1 }}. {{ task.title }} <span v-if="task.completed"
                            class="badge bg-success text-white">Completed</span></h6>
                    <p class="">{{ task.description }}</p>
                    <small class="text-muted">Assigned to: {{ task.user.name }}</small>
                </div>
                <div>
                    <button class="btn btn-success btn-sm mr-2" @click="completeTask(task)">
                        {{ task.completed ? 'Decomplete' : 'Complete' }}
                    </button>
                    <button class="btn btn-info btn-sm" v-if="!task.completed" @click="edit(task)">Edit</button>
                    <button class="btn btn-danger btn-sm" @click="deleteTask(task)">Delete</button>
                </div>
            </li>
        </ul>
        <Teleport to="body">
            <!-- use the modal component, pass in the prop -->
            <modal :show="showModal" @close="showModal = false">
                <template #header>
                    <h3>Add Users</h3>
                </template>
            </modal>
        </Teleport>

    </div>


</template>

<script>
import { mapState, mapActions } from 'vuex';
import Modal from './Modal.vue'
// import Swal from 'sweetalert2'

export default {
    components: {
        Modal
    },
    data() {
        return {
            showModal: false,
            editMode: false,
            taskEditId: null,
            newTask: {
                id: null,
                title: '',
                description: '',
                user: ''
            }
        };
    },
    computed: {
        ...mapState(['tasks', 'users']) // Simplificado para mapState
    },
    methods: {
        ...mapActions(['getTasks', 'getUsers', 'addTask', 'completeTask', 'deleteTask',]),
        addTask() {
            if (!this.newTask.title || !this.newTask.description || !this.newTask.user) {
                alert('Both title and description are required');
                return;
            }

            // Se utiliza la acción 'addTask' y luego se limpia el formulario
            if (this.editMode) {
                // console.log(this.taskEditId)
                this.$store.dispatch('updateTask', this.newTask).then(() => {
                    this.newTask.title = '';
                    this.newTask.description = '';
                    this.newTask.user = '';
                    this.editMode = false;
                }).catch(error => {
                    console.error('Error adding task:', error);
                });
            } else {
                this.$store.dispatch('addTask', this.newTask).then(() => {

                    this.newTask.title = '';
                    this.newTask.description = '';
                    this.newTask.user = '';
                }).catch(error => {
                    console.error('Error adding task:', error);
                });
            }
        },


        addNewTask() {
            this.newTask = {
                title: '',
                description: '',
                user: ''
            };
        },
        edit(task) {
            this.editMode = true;
            this.newTask = { ...task };
            this.newTask.user = task.user.id;
        },

        filtering(event) {
            this.$store.dispatch('getTasks', event.target.value).catch(error => {
                console.error('Error fetching tasks:', error);
            });
        },
        completeTask(task) {
            // Se utiliza la acción 'completeTask'
            this.$swal.fire({
                title: `you want to mark the task  ${task.title} as ${task.completed ? 'Decomplete' : 'Complete'}?`,
                showCancelButton: true,
                confirmButtonColor: "#3a9f00",
                confirmButtonText: "Complete",
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    this.$store.dispatch('completeTask', task.id).catch(error => {
                        console.error('Error completing task:', error);
                    });
                }
            });

        },
        deleteTask(task) {
            // Se utiliza la acción 'deleteTask'
            this.$swal.fire({
                title: `are you sure to delete the task  ${task.title}?`,
                showCancelButton: true,
                confirmButtonColor: "#d33",
                confirmButtonText: "Delete",
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    this.$store.dispatch('deleteTask', task.id).catch(error => {
                        console.error('Error deleting task:', error);
                    })
                }
            });

        }
    },
    mounted() {
        this.$store.dispatch('getTasks').catch(error => {
            console.error('Error fetching tasks:', error);
        });
        this.$store.dispatch('getUsers').catch(error => {
            console.error('Error fetching users:', error);
        });
    }
};
</script>
