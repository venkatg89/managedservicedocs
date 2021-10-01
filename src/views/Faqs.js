import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Icon, IconFontAwesome5Pro, TitleBar } from '../components';
import { withTheme } from "@callstack/react-theme-provider";
import { Help, Faq } from './';

const iconSize = 30;
const arrowSize = 25;

const faqStyles = theme => ({
    text: {
        color: theme.colors.contrast,
        padding: 5
    },
    textBold: {
        fontWeight: 'bold'
    },
    icon: {
        color: '#738CBF'
    }
});

const options = styles => ([
    {
        label: 'How do I capture a document?',
        text:
            <View>
                <Text style={styles.text}><Text style={styles.textBold}>1.</Text> Place the document on a flat, dark surface.</Text>
                <Text style={styles.text}><Text style={styles.textBold}>2.</Text> Open the capture screen <Icon name='camera' style={styles.icon} size={iconSize}/>.</Text>
                <Text style={styles.text}><Text style={styles.textBold}>3.</Text> Hold the phone/tablet above the document so the entire document is within the yellow frame.</Text>
                <Text style={styles.text}><Text style={styles.textBold}>4.</Text> The app will automatically photograph the document, then display it. You can choose to use the image or try again.</Text>
                <Text style={styles.text}><Text style={styles.textBold}>·</Text> If your document has 2 sides or multiple pages, you can choose to ADD MORE PAGES to the document.</Text>
                <Text style={styles.text}><Text style={styles.textBold}>·</Text> Tap DONE when you are happy with the images you captured.</Text>
            </View>
    },
    {
        label: 'How do I send a document?',
        text:
            <View>
                <Text style={styles.text}><Text style={styles.textBold}>·</Text> You must choose a document type from the list. If you’re unsure or the type is not listed, select DON’T KNOW.</Text>
                <Text style={styles.text}><Text style={styles.textBold}>·</Text> Tap SUBMIT to send the document. If cell service or WI-FI is unavailable, the document will be stored and sent when a connection is available. You can still view the document status on the Review Docs screen. <Icon name='list-box' style={styles.icon} size={iconSize}/></Text>
            </View>
    },
    {
        label: "What happens to my documents once I submit them?",
        text:
            <View>
                <Text style={styles.text}><Text style={styles.textBold}>·</Text> When submitted, the document is sent to J. J. Keller for processing. It is reviewed for accuracy and added to your driver qualification file.</Text>
                <Text style={styles.text}><Text style={styles.textBold}>·</Text> You can monitor the status of the document on the Review Docs screen <Icon name='list-box' style={styles.icon} size={iconSize}/>. You will be notified once the document successfully passes or fails the accuracy check. Should the document fail, you may be asked to submit a new image.</Text>
                <Text style={styles.text}><Text style={styles.textBold}>·</Text> If you enable NOTIFICATIONS, you'll be notified of each step along the way.</Text>
            </View>
    },
    {
        label: 'How do I enable notifications?',
        text: 
            <View>
                <Text style={styles.text}><Text style={styles.textBold}>·</Text> When you log into the Mobile App the first time, you'll be asked to enable notifications.</Text>
                <Text style={styles.text}><Text style={styles.textBold}>·</Text> You can enable notifications later in Mobile App Settings > Notifications area</Text>
            </View>
    },
    {
        label: 'What notifications are available?',
        text:
            <View>
                <Text style={styles.text}><Text style={styles.textBold}>· Document Status Notification:</Text> You’ll be notified of a status change each time a document you submitted has moved through the accuracy check process.</Text>
                <Text style={styles.text}><Text style={styles.textBold}>· Expiring Notification:</Text> You will be notified when your Driver's License or Medical Card is about to expire or has expired in your DQ file. The timing of this notification will be defined by your company’s setup.</Text>
            </View>
    }
])

const style = theme => ({
    button: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
    },
    icon: {
        padding: 5,
        color: '#738CBF',
        width: 45,
        alignSelf: 'center'
    },
    label: {
        color: theme.colors.contrast,
        flex: 1
    },
    labelContainer: {
        borderColor: theme.colors.secondaryContrast,
        borderBottomWidth: 1,
        height: '100%',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    titleBar: {
        color: '#157EFB',
    },
    arrow: {     
        color: theme.colors.secondaryContrast,
        padding: 5
    }
});

class FaqsComponent extends React.Component {
    render() { 
        const { handleNavigation, theme } = this.props;
        const classes = style(theme);
        const faqClasses = faqStyles(theme);
        return (
            <>
                <TitleBar title={'FAQs'} button={ <Icon name='arrow-back' style={classes.titleBar} size={arrowSize} onPress={() => handleNavigation(Help, 'Help')}> Help</Icon>} />
                <View style={this.props.style}>
                    <FlatList
                        data={options(faqClasses)}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderItem}
                        style={classes.list}/>
                </View>
            </>
        );
    }

    renderItem = ({item, index}) => {
        const { theme } = this.props;
        const  classes = style(theme);
        return (<View>
            <TouchableOpacity style={classes.button} onPress={() => this.props.handleNavigation(Faq, 'Faq', { label: item.label, text: item.text })}>
                <IconFontAwesome5Pro style={classes.icon} size={iconSize} name={"question-circle"} light />
                <View style={classes.labelContainer}>
                    <Text style={classes.label}>{item.label}</Text>
                    <Icon name='arrow-forward' style={classes.arrow} size={arrowSize}/>
                </View>
            </TouchableOpacity>
        </View>)
    }

    keyExtractor = (item, index) => (index.toString())
}

const Faqs = withTheme(FaqsComponent);
export { Faqs };