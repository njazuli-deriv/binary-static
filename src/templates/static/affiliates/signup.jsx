import React from 'react';
import FAQ from './faq.jsx';
import Main from './main.jsx';

// TODO: compress svgs

const BoxRow = ({ children, top_row, bottom_row }) => (
    <div className={`box-row gr-row ${top_row ? 'box-row-top' : ''} ${bottom_row ? 'box-row-bottom' : ''}`}>
        {children}
    </div>
);

const Box = ({ image, title, text }) => (
    <div className='box gr-4 gr-12-m center-text gr-padding-30'>
        <img className='gr-centered box-image' src={it.url_for(`images/pages/affiliates/${image}.svg`)} />
        <p><strong>{title}</strong></p>
        <p>{text}</p>
    </div>
);

const Step = ({ header, text, circle_no }) => (
    <div className='step'>
        <div className='border-bottom' />
        <div className='circle'>{ circle_no }</div>
        <div className='gr-padding-20 gr-gutter center-text'>
            <div className='gr-padding-20 gr-child'><strong>{header}</strong></div>
            <p className='no-margin gr-padding-10'>{text}</p>
        </div>
    </div>
);

// TODO: add lang to href ?
const signup_url = 'https://login.binary.com/signup.php';

const Signup = () => (
    <div className='static_full'>
        <div className='container'>
            <h1>{it.L('Binary.com Affiliate Programme')}</h1>
            <p>
                {it.L('Earn up to 35% commission with an award-winning binary options trading platform.')}
            </p>

            <h2 className='center-text gr-padding-30'>{it.L('How it works')}</h2>
            <div className='steps'>
                {/* TODO: add link in first step */}
                <Step circle_no='1' header={it.L('Sign up')}            text={it.L('Getting started is free and easy –– just fill out the application form and wait for our approval.')} />
                <Step circle_no='2' header={it.L('Promote Binary.com')} text={it.L('Use your unique affiliate link and the marketing tools we provide to advertise Binary.com to your audience.')} />
                <Step circle_no='3' header={it.L('Earn')}               text={it.L('Choose from two types of  commission plans when your referred clients trade binary options on our platform.')} />
            </div>
        </div>

        <div className='fill-bg-color'>
            <div className='container center-text gr-padding-30'>
                <h2>{it.L('Why you should join the Binary.com Affiliate Programme')}</h2>

                {/* TODO: add box grid */}
                <BoxRow top_row>
                    <Box title={it.L('Generous commission')}      image='commission-icon'       text={it.L('Choose a commission plan that suits your business strategy.')} />
                    <Box title={it.L('On-time payments')}         image='payment-icon'          text={it.L('Get paid by the 15th of every month. We’ve never missed a payment since we started our programme in March 2004.')} />
                    <Box title={it.L('Dedicated support')}        image='contact-icon'          text={it.L('Contact our dedicated affiliate support team for help and suggestions.')} />
                </BoxRow>
                <BoxRow bottom_row>
                    <Box title={it.L('Advanced marketing tools')} image='marketing-icon'        text={it.L('Promote our products easily, and keep track of all your earnings with our nifty marketing tools.')} />
                    <Box title={it.L('High conversions')}         image='conversion-icon'       text={it.L('We’ve paid millions in commission to date through our industry-leading affiliate programme.')} />
                {/* TODO: add link to last box */}
                    <Box title={it.L('Multiple opportunities')}   image='diversify-income-icon' text={it.L('Diversify your income stream through other partnership opportunities such as the Payment Agent Programme.')} />
                </BoxRow>

                <a className='button gr-padding-30' href={signup_url}>
                    <span>{it.L('Apply Now')}</span>
                </a>
            </div>
        </div>

        <div className='container center-text gr-padding-30'>
            <h2 className='center-text'>{it.L('Types of affiliate commission plans')}</h2>
            <p>{it.L('You can choose from two types of affiliate commission plans:')}</p>

            {/* TODO: add tabs */}
        </div>

        <div className='fill-bg-color'>
            <div className='container center-text gr-padding-30'>
                <p>{it.L('Sign up for the Binary.com Affiliate Programme today:')}</p>
                <p>
                    <a className='button' href={signup_url}>
                        <span>{it.L('Yes, I Want To Sign Up As An Affiliate')}</span>
                    </a>
                </p>
            </div>
        </div>

        <div className='container'>
            <h2 className='center-text'>{it.L('FAQ')}</h2>
        </div>
    </div>
);

export default Signup;
