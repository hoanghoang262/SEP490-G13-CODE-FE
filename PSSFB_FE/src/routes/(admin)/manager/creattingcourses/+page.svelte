<script lang="ts">
	import CourseContainer from '../../../../components/CourseContainer.svelte';
	import Button from '../../../../atoms/Button.svelte';
	import { goto } from '$app/navigation';
	import { currentUser, pageStatus } from '../../../../stores/store';
	import { deleteModCourse, getCreatingCourseByUser } from '$lib/services/ModerationServices';
	import { showToast } from '../../../../helpers/helpers';
	import { getAllCourses } from '$lib/services/CourseServices';

	export let data;
	let courses: any = data.courses ?? [];
	const DeleteCourse = async(id:number) => {
		pageStatus.set('load')
		try {
			const response = await deleteModCourse(id)
			courses = await getCreatingCourseByUser($currentUser.UserID)
		console.log(response)
		showToast("Deleted course","Deleted course successfully","success")
		} catch (error) {
			showToast("Deleted course","something went wrong","error")
		}
		pageStatus.set('done')
	}
</script>

<!-- <Table>
	<TableHead>
		<TableHeadCell>#</TableHeadCell>
		<TableHeadCell>Course</TableHeadCell>
		<TableHeadCell>Create At</TableHeadCell>
		<TableHeadCell>Create By</TableHeadCell>
		<TableHeadCell>Status</TableHeadCell>
		<TableHeadCell>Action</TableHeadCell>
	</TableHead>
	<TableBody tableBodyClass="divide-y">
		{#each courses as c, index}
			<TableBodyRow>
				<TableBodyCell>{c.courseId}</TableBodyCell>
				<TableBodyCell>{c.courseName}</TableBodyCell>
				<TableBodyCell>{c.createdAt}</TableBodyCell>
				<TableBodyCell>{c.userName}</TableBodyCell>
				<TableBodyCell>{c.status}</TableBodyCell>
				<TableBodyCell
					><Button2 classes="border mr-3" content="edit" />
          {#if c.status == 'Pending'}
						<Button2 classes="border mr-3" content="approve" />
					{:else}
						<Button2 classes="border mr-3" content="close" />
					{/if}</TableBodyCell
				>
			</TableBodyRow>
		{/each}
	</TableBody>
</Table> -->
<div class="pl-5">
	<Button onclick={() => goto('/manager/coursesmanager/addcourse')} content="Add Course" />
</div>
<div class="flex flex-wrap w-full items-center py-10">
	{#if courses?.length > 0}
		{#each courses as c}
			<div class="w-1/3 p-5">
				<CourseContainer course={c} {DeleteCourse}/>
			</div>
		{/each}
	{:else}
		<div>There is no course</div>
	{/if}
</div>
