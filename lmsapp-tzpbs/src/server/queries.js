import HttpError from '@wasp/core/HttpError.js'

export const getVideo = async (args, context) => {
  if (!context.user) throw new HttpError(401);

  const video = await context.entities.Video.findUnique({
    where: { id: args.id },
    include: { user: true }
  });

  if (!video) throw new HttpError(404, `No video with id ${args.id}`);

  if (video.userId !== context.user.id) throw new HttpError(400);

  return video;
}

export const getUserVideos = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Video.findMany({
    where: {
      userId: context.user.id
    }
  });
}