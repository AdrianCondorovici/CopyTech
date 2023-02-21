const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const Item = require('./models/items')
const Admin = require('./models/admin')
const Mesaj = require('./models/mesaj')

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://127.0.0.1:27017/copytech', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("error", console.error.bind(console, "connection error:"))
mongoose.connection.once("open", () => {
    console.log("Database connected")
})

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true}))

const sessionConfig = {
    secret: 'This is a secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}
app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Admin.authenticate()))
passport.serializeUser(Admin.serializeUser())
passport.deserializeUser(Admin.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

const isLoggedIn = (req, res, next) =>{
    console.log(req.user)
    if(!req.isAuthenticated()){
        req.flash('error', 'Nu aveti permisiunea necesara')
        return res.redirect('/magazin')
    }
    next()
}

app.get('/admin', async(req, res) => {
    const admin = new Admin({username : '1234'})
    const newAdmin = await Admin.register(admin, 'qwer')
    res.send(newAdmin)
})

app.get('/home', (req, res) => {
    res.render("pages/home")
})

app.get('/add', isLoggedIn, (req, res) => {
    res.render("pages/add")
})

app.post('/add', async (req, res) => {
    console.log(req.body.item)
    req.body.item.contAdmin = '63ea4eb88aba1ffd47da3d97'
    console.log(req.body.item)
    const item = new Item(req.body.item)
    await item.save()
    req.flash('success', 'Ai adaugat un nou produs!')
    res.redirect("/home")
})

app.post('/contact', async (req, res) => {
    req.body.mesaj.contAdmin = '63ea4eb88aba1ffd47da3d97'
    const mesaj = new Mesaj(req.body.mesaj)
    await mesaj.save()
    res.redirect("/oferte")
})

app.delete('/contact/:id', isLoggedIn, async (req,res) => {
    await Mesaj.findByIdAndDelete({_id : req.params.id})
    res.redirect('/oferte')
})

app.get('/mod/:id', isLoggedIn, async (req, res) => {
    const item = await Item.findById({_id : req.params.id})
    res.render("pages/mod", {item})
})

app.put('/mod/:id', async (req,res) => {
    const item = await Item.findByIdAndUpdate(req.params.id, {...req.body.item})
    req.flash('success', 'Produs modificat')
    res.redirect("/magazin")
})

app.delete('/mod/:id', isLoggedIn, async (req,res) => {
    await Item.findByIdAndDelete({_id : req.params.id})
    req.flash('success', 'Produs sters')
    res.redirect('/magazin')
})

app.get('/login', (req, res) => {
    res.render("pages/login")
})

app.get('/login', (req, res) => {
    res.render("pages/login")
})

app.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    req.flash('success', 'Setarile magazinului sunt acum disponibile')
    res.redirect('/home')
})

app.get('/oferte', async (req, res) => {
    const mesaje = await Mesaj.find({})
    res.render("pages/oferte", {mesaje})
})

app.get('/aparatura', async (req, res) => {
    const mesaje = await Mesaj.find({})
    res.render("pages/aparatura", {mesaje})
})

app.get('/magazin', async(req, res) => {
    const items = await Item.find({})
    res.render("pages/magazin", {items})
})

app.post('/magazin/cauta', async(req, res) => {
    const items = await Item.find({})
    let search = req.body.termen
    console.log(search)
    res.render("pages/magazin", {items, search})
})

app.get('/magazin/:clasa', async(req, res) => {
    const items = await Item.find({clasa : req.params.clasa})
    res.render("pages/magazin", {items})
})

app.use((req, res, next) => {
    res.render("pages/home")
})

app.listen(3000, () => {
    console.log("Serving on port 3000")
})
