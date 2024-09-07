<script>
import {  mapActions } from 'vuex';
export default {
    props: {
        show: Boolean
    },
    data
        () {
        return {
            newUser: {
                name: '',
                email: '',
            }
        }
    },
    methods: {
        ...mapActions(['addUser']),
        addUser() {
            if (!this.newUser.name || !this.newUser.email) {
                alert('Both name and email are required');
                return;
            }
            // Se utiliza la acción 'addUser' y luego se limpia el formulario
            this.$store.dispatch('addUser', this.newUser).then(() => {
                this.newUser.name = '';
                this.newUser.email = '';
                this.$emit('close')
            }).catch(error => {
                console.log('Error adding user:');
                console.error('Error adding user:', error);
            });
        }

    }
}
</script>

<template>
    <Transition name="modal" >
        <div>
            <div v-if="show" class="modal-mask">
                <div class="modal-container">
                    <div class="modal-header">
                        <div class="w-100 d-flex justify-content-between align-items-center">
                            <div>
                                <slot name="header" />
                            </div>
                            <div>
                                <button class="btn  btn-outline-warning" @click="$emit('close')">x</button>
                            </div>
                        </div>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            <form action="">
                                <form @submit.prevent="addUser" class="">
                                    <div class="form-group">
                                        <label for="" class="font-weight-bold">Name</label>
                                        <input v-model="newUser.name" class="form-control" placeholder="Task Title"
                                            required>
                                    </div>
                                    <div class="form-group">
                                        <label for="" class="font-weight-bold">Email</label>
                                        <input v-model="newUser.email" class="form-control"
                                            placeholder="Task Description" required>
                                    </div>

                                    <button type="submit" class="btn btn-success btn-block">Add User</button>
                                </form>
                            </form>
                        </slot>
                    </div>

                    <!-- <div class="modal-footer">
          <slot name="footer">
            <button
              class="modal-default-button"
              @click="$emit('close')"
            >OK</button>
          </slot>
        </div> -->
                </div>
            </div>
        </div>


    </Transition>
</template>

<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
}

.modal-container {
    width: 300px;
    margin: auto;
    padding: 10px 5px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header h3 {
    margin-top: 0;
    color: #0c2f79;
}

.modal-body {
    margin: 20px 0;
}



.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>