import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, RTE, Select } from '..';
import appwriteService from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostForm({ post }) {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, control, getValues, watch } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active',
    },
  });

  const userData = useSelector((state) => state.auth.userData);

  const submitPost = async (data) => {
    if (post) {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        
        const dbPost = await appwriteService.createPost({ ...data, userId: userData?.$id });
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = (value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-');
    }
    return '';
  };

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value));
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  // Handling the delete logic
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await appwriteService.deletePost(post.$id);
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit(submitPost)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input label="Title :" placeholder="Title" className="mb-4" {...register('title', { required: true })} />
        <Input label="Slug :" placeholder="Slug" className="mb-4" {...register('slug', { required: true })} />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues('content')} />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register('image', { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select options={['active', 'inactive']} label="Status" className="mb-4" {...register('status', { required: true })} />
        <Button type="submit" bgColor={post ? 'bg-green-500' : undefined} className="w-full">
          {post ? 'Update' : 'Submit'}
        </Button>

        {post && (
          <div className="flex justify-between mt-4">
            <Button onClick={handleDelete} className="px-4 py-2 text-white duration-200 bg-red-500 rounded-full hover:bg-red-600">
              Delete
            </Button>
            <Button
              onClick={() => navigate(`/post/edit/${post.$id}`)}
              className="px-4 py-2 text-white duration-200 bg-yellow-500 rounded-full hover:bg-yellow-600"
            >
              Edit
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}

export default PostForm;
