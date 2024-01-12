import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties
// that are required to create a new User
interface UserAttributes {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Model has (like static methods)
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttributes): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  // JSON that will be sent to browser view will be changed
  // Consistent response across all Services
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
      versionKey: false,
    },
  }
);

//Crypt password before saving in db
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashPass = await Password.toHash(this.get('password'));
    this.set('password', hashPass);
  }
  done();
});

//Adding Static method to MongooseModel
userSchema.statics.build = (attrs: UserAttributes) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };

// User.build({
//   email: 'ss',
//   password: 'ww',
// });

//Adding type checking to mongoose documents
// const build = (attr:UserAttributes) => {
//   return new User(attr);
// };

// build({
//   email:'q',
//   password:'q'
// })
