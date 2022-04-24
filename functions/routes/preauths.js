
import express from 'express'


const router = express.Router()

router.get('/',(req,res) => {
  let preauths = [
    {
      date: new Date(),
      name: "Patient 1",
      phone: "0711458",
      doctor: "Doctors name",
      items: [
        {item:"Carboplatin 450mg", quantity: 1, price: 3000, total: 3000, notIssued: false},
        {item:"Carboplatin 150mg", quantity: 2, price: 2000, total: 4000, notIssued: false},
        {item:"Xeloda 500mg", quantity: 84, price: 200, total: 16800, notIssued: false},
      ]
    },
    {
      date: new Date(),
      name: "Patient 2",
      phone: "0711458",
      doctor: "Doctors name",
      items: [
        {item:"Rituximab 440mg", quantity: 1, price: 72000, total: 72000, notIssued: false},
        {item:"Carboplatin 150mg", quantity: 2, price: 2000, total: 4000, notIssued: false},
        {item:"Xeloda 500mg", quantity: 84, price: 200, total: 16800, notIssued: false},
      ]
    }
  ]
  res.json({data:preauths})
})

router.post("/",(req,res)=> {
  
})

router.get("/new", (req,res)=> {

})

export default router
