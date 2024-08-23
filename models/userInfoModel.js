const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        minLength: 5
    },
    slug: {
        type: String,
        lowercase: true
    },
    gender: {
        type: String,
        require: true,
        enum: ['male', 'female'],
        default: 'male'
    },
    age: {
        type: Number,
        min: 5,
        max: 90,
        require: true
    },
    phone: Number,
    price: {
        type: Number,
    },
    paid: {
        type: Number,
    },
    restOfPrice: {
        type: Number,
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: Date,
    medicalConditions: String, /* للحالات الطبية */
    allergies: String, /* للحساسيات */
    currentMedications: [{ /* للأدوية الحالية */
        name: String,
        dose: String, /* جرعة */
        frequency: String /* تكرار */
    }],
    currentComplaints: String, /* للشكاوى الحالية */
    treatmentsHistory: [{ /* لتاريخ العلاجات السابق */
        historyType: String,
        date: Date,
        toothNumber: Number, /* رقم_السن */
        material: String, /* مادة */
    }],
    radiographs: [{ /* لصور الأشعة */
        radioType: String,
        date: Date,
        toothNumber: Number, /* رقم_السن */
        findings: String, /* نتائج */
        scannerImg: [String]
    }],
    clinicalExamination: [{ /* للفحوصات السريرية */
        notes: String,
        oralHygiene: String, /* نظافة_الفم */
        periodontalStatus: String, /* حالة_اللثة */
    }],
    treatmentsPlan: [{ /* خطة العلاجات */
        date: Date,
        treatments: String, /* علاجات */
        dentist: {
            type: String,
            default: 'Dr.Hussin'
        },
        image: String
    }],
    treatmentsDetails: [{ /* تفاصيل العلاجات */
        process: String,
        processDetails: String,
        price: Number,
        paid: Number,
        restOfPrice: Number,
        date: Date,
    }],
    recommendations: String, /* للتوصيات والنصائح */
}, { timestamps: true })


// const url = (doc) => {
//     if (doc.radiographs) {
//         doc.radiographs.forEach(radiograph => {
//             if (radiograph.scannerImg)
//                 radiograph.scannerImg = radiograph.scannerImg.map(img => {
//                     if (!img.startsWith(process.env.BASE_URL)) {
//                         return `${process.env.BASE_URL}/scanner/${img}`;
//                     }
//                     return img;
//                 });
//         });
//     }

//     if (doc.treatmentsPlan) {
//         doc.treatmentsPlan.forEach(treatment => {
//             if (treatment.image && !treatment.image.startsWith(process.env.BASE_URL)) {
//                 treatment.image = `${process.env.BASE_URL}/treatment/${treatment.image}`;
//             }
//         });
//     }
// }

// userInfoSchema.post('save', (doc) => {
//     url(doc)
// })
// userInfoSchema.post('init', (doc) => {
//     url(doc)
// })

const userInfoModel = mongoose.model('UserInfo', userInfoSchema)

module.exports = userInfoModel