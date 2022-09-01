const { Schema, model } = require("mongoose");

const bcrypt = require("bcryptjs");

const userSchema = Schema(
  {
    firstname: { type: String, required: true, min: 3, max: 20, trim: true },
    lastname: { type: String, required: true, min: 3, max: 20, trim: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number, required: true, unique: true, max: 10, min: 10 },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["member", "admin", "trainer"],
      default: "user",
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;

    return next();
  });
  //const hash = bcrypt.hashSync(this.password,10);
  // this.password = hash;
});

userSchema.methods.checkPassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function (err, same) {
      // res === true
      if (err) {
        return reject(err);
      }
      resolve(same);
    });
  });

  // return bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);
module.exports = User;
