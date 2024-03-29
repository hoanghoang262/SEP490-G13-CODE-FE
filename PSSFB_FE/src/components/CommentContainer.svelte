<script lang="ts">
	import { Textarea } from 'flowbite-svelte';

	import Avatar from '../atoms/Avatar.svelte';
	import Button from '../atoms/Button.svelte';
	import Icon from '@iconify/svelte';
	import { currentUser, pageStatus } from '../stores/store';
	import { checkExist, showToast } from '../helpers/helpers';
	import {
		delComment,
		delReplyComment,
		putComment,
		putReplyComment
	} from '$lib/services/CommentService';
	import Editor from '@tinymce/tinymce-svelte';
	export let comments: any[];
	export let editcomment: any = {};
	export let editreply: any = {};
	export let getComment: any;
	$: replies = comments.flatMap((item) => item?.replies);
	//export let type = 'post';

	const replyClick = (id: number) => {
		const replyFrm = document.getElementById(`replyFrm#${id}`);
		if (replyFrm?.classList.contains('hidden')) {
			replyFrm.classList.remove('hidden');
		} else {
			replyFrm?.classList.add('hidden');
		}
	};

	const editClick = (id: number) => {
		const editor = document.getElementById(`commenteditor${id}`);
		const content = document.getElementById(`commentcontent${id}`);
		if (editor?.classList.contains('hidden')) {
			const { commentContent, date, userId } = comments.find((c: any) => c.id == id);
			editcomment = { id, commentContent, date, userId };
			editor?.classList.remove('hidden');
			content?.classList.add('hidden');
		} else if (content?.classList.contains('hidden')) {
			content?.classList.remove('hidden');
			editor?.classList.add('hidden');
		}
	};

	const replyeditClick = (id: number) => {
		const editor = document.getElementById(`replyeditor${id}`);
		const content = document.getElementById(`replycontent${id}`);
		if (editor?.classList.contains('hidden')) {
			const {replyContent} = replies.find((c: any) => c.id == id);
			editreply = { replyId: id, replyContent };
			editor?.classList.remove('hidden');
			content?.classList.add('hidden');
		} else if (content?.classList.contains('hidden')) {
			content?.classList.remove('hidden');
			editor?.classList.add('hidden');
		}
	};

	async function updateComment() {
		pageStatus.set('load');
		try {
			await putComment(editcomment);
			comments = await getComment();
			showToast('Update Comment', 'Update Comment Success', 'success');
			const editor = document.getElementById(`commenteditor${editcomment.id}`);
			const content = document.getElementById(`commentcontent${editcomment.id}`);
			if (content?.classList.contains('hidden')) {
				content?.classList.remove('hidden');
				editor?.classList.add('hidden');
			}
		} catch (error) {
			console.log(error);
		}
		pageStatus.set('done');
	}

	async function updateReply() {
		pageStatus.set('load');
		try {
			console.log(editreply)
			await putReplyComment(editreply);
			comments = await getComment();
			showToast('Update Comment', 'Update Comment Success', 'success');
			const editor = document.getElementById(`replyeditor${editreply.replyId}`);
			const content = document.getElementById(`replycontent${editreply.replyId}`);
			if (content?.classList.contains('hidden')) {
				content?.classList.remove('hidden');
				editor?.classList.add('hidden');
			}
		} catch (error) {
			console.log(error);
		}
		pageStatus.set('done');
	}

	function handleKeydown(e: any, id: number) {
		if (e.key == 'Enter') {
			const frm: any = document.getElementById(`rfrm${id}`);
			frm.submit();
		}
	}

	async function deleteClick(id: number) {
		pageStatus.set('load');
		await delComment(id);
		comments = await getComment();
		pageStatus.set('done');
	}

	async function replydeleteClick(id: number) {
		pageStatus.set('load');
		await delReplyComment(id);
		comments = await getComment();
		pageStatus.set('done');
	}
</script>

<div>
	<div class="py-5 text-2xl">{comments?.length} Comments</div>
	{#if checkExist($currentUser)}
		<form method="POST" action="?/postcomment">
			<div class="flex mb-3">
				<div class="w-10 mr-3">
					<Avatar classes="rounded-full" src={$currentUser?.photoURL} />
				</div>

				<Textarea name="content" rows="5" />
			</div>
			<div class="flex justify-end"><Button content="Post" /></div>
		</form>
	{/if}
	<hr class="my-5" />
	{#each comments as c}
		<div class="flex">
			<div class="w-10 mr-3">
				<Avatar classes="rounded-full" src={c.picture} />
			</div>
			<div>
				<div class="flex">
					<div class="text-blue-500 mr-3">{c.userName}</div>
					<div class="text-neutral-400">{c.date}</div>
				</div>
				<di id="commentcontent{c.id}">{c.commentContent}</di>
				<div class="hidden" id="commenteditor{c.id}">
					<Textarea bind:value={editcomment.commentContent} />
					<div class="flex justify-end"><Button onclick={updateComment} content="save" /></div>
				</div>
				<div class="flex items-center">
					<Icon class="text-2xl mr-3" icon="iconamoon:like-thin" style="color: black" />
					{#if checkExist($currentUser)}
						<button class="mr-3" on:click={() => replyClick(c.id)}>reply</button>
					{/if}
					{#if c?.userId == $currentUser?.UserID}
						<button class="mr-3" on:click={() => editClick(c.id)}>edit</button>
						<button class="mr-3 text-red-500" on:click={() => deleteClick(c.id)}>delete</button>
					{/if}
				</div>
				{#if checkExist($currentUser)}
					<div id="replyFrm#{c.id}" class="mt-5 hidden">
						<form id="rfrm{c.id}" method="POST" action="?/postreply">
							<div class="flex mb-3">
								<div class="w-10 mr-3">
									<Avatar classes="rounded-full" src={$currentUser?.photoURL} />
								</div>
								<input type="hidden" name="commentId" readonly value={c.id} />
								<Textarea on:keydown={() => handleKeydown(event, c.id)} name="content" rows="3" />
							</div>
						</form>
					</div>
				{/if}
				{#each c.replies as reply}
					<div class="flex my-3">
						<div class="w-10 mr-3">
							<Avatar classes="rounded-full" src={reply.userPicture} />
						</div>
						<div>
							<div class="flex">
								<div class="text-blue-500 mr-3">{reply.userName}</div>
								<div class="text-neutral-400">{reply?.createDate}</div>
							</div>
							<div id="replycontent{reply.id}">{reply.replyContent}</div>
							<div class="hidden" id="replyeditor{reply.id}">
								<Textarea bind:value={editreply.replyContent} />
								<div class="flex justify-end"><Button onclick={updateReply} content="save" /></div>
							</div>
							<div class="flex items-center">
								<Icon class="text-2xl mr-3" icon="iconamoon:like-thin" style="color: black" />

								{#if reply?.userId == $currentUser?.UserID}
									<button class="mr-3" on:click={() => replyeditClick(reply.id)}>edit</button>
									<button class="mr-3 text-red-400" on:click={() => replydeleteClick(reply.id)}
										>delete</button
									>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<hr class="my-5" />
	{/each}
</div>
