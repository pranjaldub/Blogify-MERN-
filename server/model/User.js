// here we create schema and its validation
//import {findOrCreate} from "mongoose-findorcreate";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// userSchema.statics.findOrCreate = async function findOrCreate(profile, cb) {
//   var userObj = new this();
//   const result = await this.findOne({
//     //name: profile.displayName,
//     username: `${profile.name.givenName}${profile.id}`,
//     //password: profile.id,
//   });

//   if (!result) {
//     userObj.name = profile.displayName;
//     userObj.username = `${profile.name.givenName}${profile.id}`;
//     userObj.password = profile.id;
//     //....
//     userObj.save().then((result) => {
//       console.log(result);
//     });
//   } else {
//     cb(err, result);
//   }
// };
const User = mongoose.model("User", userSchema);

export default User;
