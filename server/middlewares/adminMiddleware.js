const adminMiddleware = async (req, res, next) => {
  try {
    // console.log(req.user);
    const adminRole = req.user.isAdmin;
    console.log(adminRole);

    if (adminRole === "false") {
      return res
        .status(403)
        .json({ message: "Access denied. User is not an admin!!" });
    }

    // res.status(200).json({ msg: req.user.isAdmin });

    // this line is extremely important because it sends the control to the next portion of 
    // middleware where --> https://prnt.sc/8ew83IpZ2VOa (follow this sc for more info)
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;
