<template>
  <div class="page-grade">
    <grade-student v-if="$store.state.userInfo.usertype === 'student'"></grade-student>
    <grade-teacher v-if="$store.state.userInfo.usertype === 'teacher'"></grade-teacher>
  </div>
</template>

<script>
import GradeStudent from './GradeStudent.vue'
import GradeTeacher from './GradeTeacher.vue'

export default {
  components: {
    GradeStudent,
    GradeTeacher,
  }
}
</script>
