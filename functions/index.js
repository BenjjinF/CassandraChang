const functions = require('firebase-functions')
const mailgun = require('mailgun-js')({
  apiKey: functions.config().mailgun.key,
  domain: functions.config().mailgun.domain
})

exports.homeEvaluationSubmission = functions.firestore.document('homeEvaluation/{id}')
  .onCreate((snap, context) => {
  
    const submission  = snap.data()
    let { 
      name,
      email,
      phone,
      questionsOrComments,
      propertyType,
      streetAddress,
      city,
      bedrooms,
      bathrooms,
      lotSize,
      floorArea,
      yearBuilt,
      buildingCondition,
      basement,
      timeline,
      appliancesIncluded
    } = submission

    let emailOptions = {
      from: 'CassandraChang.com <notifications@btfrost.com>',
      subject: `Home Evaluation Request: ${name}`,
      html: `
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phone}</p>
      <p>Comments: ${questionsOrComments}</p>
      <p>Property Type: ${propertyType}</p>
      <p>Street Address: ${streetAddress}</p>
      <p>City: ${city}</p>
      <p>Bedrooms: ${bedrooms}</p>
      <p>Bathrooms: ${bathrooms}</p>
      <p>Lot Size: ${lotSize}</p>
      <p>Floor Area: ${floorArea}</p>
      <p>Year Built: ${yearBuilt}</p>
      <p>Building Condition: ${buildingCondition}</p>
      <p>Basement: ${basement}</p>
      <p>Timeline: ${timeline}</p>
      <p>Appliances Included: ${appliancesIncluded}</p>
      `,
      'h:Reply-To': email,
      to: 'cassandrachang@gmail.com'
    }
    
    mailgun.messages().send(emailOptions, function (error, body) {
      console.log(body);
    })

})

exports.contactSubmission = functions.firestore.document('contact/{id}')
  .onCreate((snap, context) => {
    const submission  = snap.data()
    let { name, email, phone, comments } = submission

    let emailOptions = {
      from: 'CassandraChang.com <notifications@btfrost.com>',
      subject: `Contact Submission: ${name}`,
      html: `
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phone}</p>
      <p>Comments: ${comments}</p>
      `,
      'h:Reply-To': email,
      to: 'cassandrachang@gmail.com'
    }
    
    mailgun.messages().send(emailOptions, function (error, body) {
      console.log(body);
    })
})