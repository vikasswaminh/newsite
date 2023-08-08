import HttpError from '@wasp/core/HttpError.js'

export const createVideo = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Video.create({
    data: {
      title: args.title,
      description: args.description,
      url: args.url,
      user: { connect: { id: context.user.id } }
    }
  });
}

export const deleteVideo = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const video = await context.entities.Video.findUnique({
    where: { id: args.id }
  });
  if (video.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Video.delete({
    where: { id: args.id }
  });
}