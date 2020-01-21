<template>
<profil></profil>
</template>

<script>
import Profil from "../components/Profil";

export default {
  components: {
    Profil
  },
  mounted() {
    if(!this.connected()){
				this.$router.push('/login');
			}
  }
};
</script>