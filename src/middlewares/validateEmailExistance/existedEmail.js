const existedEmail = async (email, Model) => {
  const isExisted = await Model.findOne({ email: email }).exec();
  if (!isExisted) {
    return false;
  } else {
    return true;
  }
};

export default existedEmail;
