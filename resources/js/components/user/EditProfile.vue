<template>
    <div class="card">
        <div class="card-body">
            <edit-profile-form></edit-profile-form>
        </div>
    </div>
</template>

<script>
    import EditProfileForm from "./EditProfileForm";

    export default {
        name: 'edit-profile',
        components: {
            EditProfileForm
        }
    }

</script>
