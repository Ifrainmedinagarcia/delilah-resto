const createUser = (req, res) =>{
    const {name, email, password, roles} = req.body
        const { error } = validateRegister.validate(req.body)
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            })
        }
        const isEmailExist = await User.findOne({email})
        if (isEmailExist) {
            return res.status(400).json({
                error: 'Email ya registrado'
            })
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        
        const user = new User({
            name,
            email,
            password: passwordHash,
            roles
        })

        if (roles) {
            const foundRoles = await Roles.find({Name: {$in: roles}})
            user.roles = foundRoles.map(role => role._id)
        }else{
            const role = await Roles.findOne({Name:'user'})
            user.roles = [role._id]
        }

        try {
            const saveUser = await user.save()
            res.status(200).json({
                error: null,
                data: saveUser
            })
        } catch (error) {
            res.status(400).json({ error })
        }
}

exports.createUser = createUser