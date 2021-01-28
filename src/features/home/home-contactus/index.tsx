import React from 'react';
import { Space, Typography, Image } from 'antd';

const HomeContactUs = () => {
    return (
        <>
            <Typography.Title style={{color: '#f2f2f2'}}>Want more information?</Typography.Title>
            <Typography.Paragraph style={{color: '#f2f2f2'}}>
                If you have any inquiries or are interested in getting involved with the AUSDDREvents team, feel free to get in touch with us via the following services:
            </Typography.Paragraph>
            <Space direction='horizontal'>
                <Image src="https://i.imgur.com/DG4HgJn.png" className='smallimagewidth'/>
                <Image src="https://i.imgur.com/zGzeQ7G.png" className='smallimagewidth'/>
                <Image src="https://i.imgur.com/j1aQgYK.png" className='smallimagewidth'/>
            </Space>
            <Typography.Paragraph style={{color: '#f2f2f2'}}>    
                We’re looking forward to seeing your moves on the dance floor!
            </Typography.Paragraph>
        </>
    )
}

export default HomeContactUs;
