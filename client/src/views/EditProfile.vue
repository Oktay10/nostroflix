<template>
<EditProfile></EditProfile>
</template>

<script>
import EditProfile from "../components/EditProfile";

export default {
  components: {
    EditProfile
  },
  mounted() {
    if(!this.connected()){
				this.$router.push('/login');
			}
  }
};
</script>