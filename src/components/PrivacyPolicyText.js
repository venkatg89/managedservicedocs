import React from 'react';
import { Text } from 'react-native';
// import { withTheme } from "@callstack/react-theme-provider";

const style =  theme => ({
    textColor: {
        // color: theme.colors.contrast,
    },
    text: {
        // color: theme.colors.contrast,
        paddingBottom: 15
    },
    bold: {
        fontWeight: 'bold'
    },
    underline: {
        textDecorationLine: 'underline'
    }
});

const PrivacyPolicyTextComponent = props => {
    const  classes = style(props.theme);
    return (
    <>
        <Text style={{...classes.bold, ...classes.text, ...props.textStyle}}>J. J. KELLER SPECIFIC PRIVACY POLICY</Text>
        <Text style={{...classes.bold, ...classes.text, ...props.textStyle}}>For Managed Services Mobile Applications</Text>
        <Text style={{...classes.text, ...props.textStyle}}>This Specific Privacy Policy (the “Specific Privacy Policy”) lets you know how we collect, use, share, and protect information about you when you interact with J. J. Keller through our Managed Services Application (the “Managed Services App”) to use or obtain any of our products or services (the “Services”).  This Specific Privacy Policy will apply and govern your use of the Managed Services App. To the extent there is a conflict between the terms of this Specific Privacy Policy and the Specific Privacy Policy, the terms of the Specific Privacy Policy shall apply to your use of that app. If you have questions about anything in this Specific Privacy Policy, please contact us at jjkellerclientcenter@jjkeller.com.</Text>
        <Text style={{...classes.text, ...props.textStyle}}>The Managed Services App is a business to business application and is not intended for personal use.  We provide the Managed Services App on behalf of our business clients (“Business Client(s)”) to provide you access to the Services through the Managed Services App.  Although members of the general public may access the app, they cannot create an account or use its Services.  By using our Managed Services App you agree to the privacy practices described in this Specific Privacy Policy. If you do not agree with this Specific Privacy Policy, please uninstall the app from your device and stop using the Managed Services App. By continuing to use the Services, you accept this Specific Privacy Policy.</Text>
        <Text style={{...classes.bold, ...classes.textColor, ...props.textStyle}}>INFORMATION WE COLLECT</Text>
        <Text style={{...classes.text, ...props.textStyle}}>The information we collect from you varies, depending on the way you use our Managed Services App.  We collect information from or about you in the ways described below.</Text>
        <Text style={{...classes.bold, ...classes.textColor, ...props.textStyle}}>Information You Provide To Us</Text>
        <Text style={{...classes.text, ...props.textStyle}}>When you use our Managed Services App, we collect information that you choose to share with us and our Business Client.  We collect several types of personal information from and about you when you use our Managed Service App or Services.  This information may include:</Text>
        <Text style={{...classes.text, ...props.textStyle}}>·  Name</Text>
        <Text style={{...classes.text, ...props.textStyle}}>·  Address</Text>
        <Text style={{...classes.text, ...props.textStyle}}>·  Company name</Text>
        <Text style={{...classes.text, ...props.textStyle}}>·  Email address</Text>
        <Text style={{...classes.text, ...props.textStyle}}>·  Telephone number</Text>
        <Text style={{...classes.text, ...props.textStyle}}>·  Driver’s License Number</Text>
        <Text style={{...classes.text, ...props.textStyle}}>·  Image of Driver’s License</Text>
        <Text style={{...classes.bold, ...classes.textColor, ...props.textStyle}}>Geolocation</Text>
        <Text style={{...classes.text, ...props.textStyle}}>The Managed Services App may utilize location services on your mobile device to collect and use location data, including the real-time geographic location of your device.  This feature is currently disabled by J. J. Keller.  J. J. Keller will notify you if this feature is enabled and if you consent to the app’s utilization of location services, we may use GPS, Bluetooth, your device’s unique identifier, and/or your IP Address, along with Wi-Fi and cell tower locations, and other technologies to determine your device’s geolocation. This location data is utilized by our Business Client and us to initiate notifications or deliver services requested by you. We will collect geolocation data only if you consent, and we will notify you whether the location services will be always running or only when the app is in use.  You may choose to disable location services through our app, but if you do so, you will not receive any notifications or services that require a geolocation.   Most mobile devices provide users with the ability to disable location services.  These controls are generally located in the device’s settings menu.  You can also contact your mobile service carrier or your device manufacturer for more information on disabling location services. </Text>
        <Text style={{...classes.bold, ...classes.textColor, ...props.textStyle}}>Other Information We Collect When You Use The Services</Text>
        <Text style={{...classes.text, ...props.textStyle}}>The Managed Services App collects certain information automatically about you and your use of our Services that does not necessarily personally identify you, your interactions with us and information regarding the device you use to access the Managed Services App and Services (collectively “Other Information”).  This information includes:</Text>
        <Text style={{...classes.text, ...props.textStyle}}>·  device information or ID</Text>
        <Text style={{...classes.text, ...props.textStyle}}>·  identifiers associated with cookies or other technologies that may uniquely identify your device or browser (e.g. device advertising ID)</Text>
        <Text style={{...classes.bold, ...classes.textColor, ...props.textStyle}}>HOW WE USE YOUR INFORMATION</Text>
        <Text style={{...classes.text, ...props.textStyle}}>We use information that we collect about you or that you provide to us, including any personal information in various ways to operate our business, provide you products and services and our Managed Services App.  The ways we use your information include:</Text>
        <Text style={{...classes.text, ...props.textStyle}}>·  Deliver our Services to you, including providing access to our app’s features</Text>
        <Text style={{...classes.text, ...props.textStyle}}>·  Communicate with you about the Services, including to respond to your service requests or respond to any other inquiry or correspondence you send to us;</Text>
        <Text style={{...classes.text, ...props.textStyle}}>·  Provide you updates, reminders, or other informational or educational content</Text>
        <Text style={{...classes.text, ...props.textStyle}}>·  Analyze and improve the app and Services: including developing and improving products and services, monitoring and analyzing trends and usage;</Text>
        <Text style={{...classes.text, ...props.textStyle}}>·  Prevent, detect, investigate, or remediate security or other legal concerns, including fraud </Text>
        <Text style={{...classes.text, ...props.textStyle}}>·  To protect the rights, property, or safety of us our users, or any other person or the copyright-protected content of the Services</Text>
        <Text style={{...classes.text, ...props.textStyle}}>·  Comply with applicable laws, regulations, or industry requirements, or respond to subpoenas or government requests</Text>
        <Text style={{...classes.text, ...props.textStyle}}>·  Fulfill any other purpose for which you provide it or consent</Text>
        <Text style={{...classes.bold, ...classes.textColor, ...props.textStyle}}>HOW WE SHARE YOUR INFORMATION</Text>
        <Text style={{...classes.textColor, ...props.textStyle}}>We may share information collected about you in the following situations:</Text>
        <Text style={{...classes.textColor, ...props.textStyle}}>·  With the Business Client on whose behalf we provide you access to the Managed Services App in order to provide our Services</Text>
        <Text style={{...classes.textColor, ...props.textStyle}}>·  With service providers, sellers, and partners:</Text>
        <Text style={{...classes.textColor, ...props.textStyle}}>  ·  We share information about you with service providers to perform functions and process your data and to help provide our app and Services including hosting and storage providers, payment processors etc.</Text>
        <Text style={{...classes.textColor, ...props.textStyle}}>·  With third parties for legal or security reasons:</Text>
        <Text style={{...classes.textColor, ...props.textStyle}}>  ·  We may share information about you if we reasonably believe that disclosing the information is needed to:</Text>
        <Text style={{...classes.textColor, ...props.textStyle}}>  ·  comply with any valid legal process, governmental request, or applicable law, rule, or regulation.</Text>
        <Text style={{...classes.textColor, ...props.textStyle}}>  ·  investigate, remedy, or enforce potential violations of our End User License Agreement and Terms of Use </Text>
        <Text style={{...classes.textColor, ...props.textStyle}}>  ·  protect the rights, property, and safety of us, our users, or others.</Text>
        <Text style={{...classes.textColor, ...props.textStyle}}>  ·  Detect and resolve any fraud or security concerns.</Text>
        <Text style={{...classes.textColor, ...props.textStyle}}>·  With third parties as part of an acquisition or liquidation:</Text>
        <Text style={{...classes.textColor, ...props.textStyle}}>  ·  We are involved in a merger, asset sale, financing, corporate divestiture, reorganization, or acquisition of all or some portion of our business to another company or if we undergo liquidation or bankruptcy proceedings, we may share your information in connection with such transaction or proceeding before and or after the transaction closes or the proceedings are completed.</Text>
        <Text style={{...classes.textColor, ...props.textStyle}}>·  With your consent. We may share information in other ways if you give us consent or direct us to do so.</Text>
        <Text style={{...classes.text, ...props.textStyle}}>·  We do not share personal information with third parties for their marketing purposes.</Text>
        <Text style={{...classes.bold, ...classes.textColor, ...props.textStyle}}>Aggregated de-identified information</Text>
        <Text style={{...classes.text, ...props.textStyle}}>We may also share with third parties—such as advertisers—aggregated, or de-identified information and we do not limit our third-party providers from using, selling, licensing, distributing, or disclosing de-identified data.</Text>
        <Text style={{...classes.bold, ...classes.textColor, ...props.textStyle}}>HOW WE PROTECT YOUR INFORMATION</Text>
        <Text style={{...classes.text, ...props.textStyle}}>We take reasonable precautions to protect your information. Please keep in mind that Wi-Fi and the Internet are not 100% secure mediums for transmitting communications, and we cannot guarantee that the information collected about you will always remain private when using our Managed Services App or Services.  We do not control the security offered by your mobile device and do not protect information to the extent it is stored on your mobile device.  To the extent you download or capture information to transmit to us using your phone’s other applications (e.g. photo app), we protect the information and images when you transmit them through our application but do not protect that information to the extent it is stored on your phone.  As a result, while we strive to protect your personal information, we cannot guarantee the security of any information you transmit to us, and you do so at your own risk.</Text>
        <Text style={{...classes.bold, ...classes.textColor, ...props.textStyle}}>YOUR ACCESS AND CHOICES ABOUT YOUR INFORMATION</Text>
        <Text style={{...classes.text, ...props.textStyle}}>Access and Updates to your Information. You can access and update your login credentials on our Managed Services App by clicking on "Account Profile". For any additional updates to your company profile, your company can contact a J. J. Keller representative as shown below.  </Text>
        <Text style={{...classes.bold, ...classes.textColor, ...props.textStyle}}>CONTACT US</Text>
        <Text style={{...classes.textColor, ...props.textStyle}}>If you have any questions about this policy or the services, please contact us at:</Text>
        <Text style={{...classes.textColor, ...props.textStyle}}>Email: jjkellerclientcenter@jjkeller.com </Text>
        <Text style={{...classes.text, ...props.textStyle}}>Phone: 1-833-813-7264</Text>
        <Text style={{...classes.bold, ...classes.textColor, ...props.textStyle}}>CHANGES TO OUR SPECIFIC PRIVACY POLICY</Text>
        <Text style={{...classes.text, ...props.textStyle}}>We may make changes to this policy from time to time, in our sole discretion. We will provide you notice of material changes by indicating that the Specific Privacy Policy has been updated on our app and will indicate the date we made the update below.  Your continued use of any of the Managed Services App and Services after the changes have been made will constitute your acceptance of the changes. Please therefore make sure you read any such notice carefully. If you do not wish to continue using the Services under the new version of the policy, please uninstall the Managed Service App and cease using the Services.</Text>
        <Text style={{...classes.text, ...props.textStyle}}>This Specific Privacy Policy was last modified on June 10, 2019.</Text>
    </>
)};

// const PrivacyPolicyText = withTheme(PrivacyPolicyTextComponent);
// export { PrivacyPolicyText };

export { PrivacyPolicyTextComponent };