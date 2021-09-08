import { Avatar, List, Spin } from 'antd';
import { UserOutlined, SmileOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import reqwest from 'reqwest';
import './Activity.css'

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

//antd list works with data in form of []


const Activity = () => {

    const [data, setData] = useState([])

    const [loading, setLoading] = useState(false)

    const [hasMore, setHasMore] = useState(true)

    

    const fetchData = callback => {
        reqwest({
            url: fakeDataUrl,
            type: 'json',
            method: 'get',
            contentType: 'application/json',
            success: res => {
                callback(res);
            },
        });
    };

    useEffect(() => fetchData(res => setData(res.results)),[])

    

    const handleInfiniteOnLoad = () => {

        setLoading(true)

        if (data.length > 14) {
            // message.warning('Infinite List loaded all');
            
            setHasMore(false)
            setLoading(false)
            return true;
        }
        
        fetchData(res => {
            setData(data.concat(res.results))
            setLoading(false)
        });
    };


    return (
        <div className="demo-infinite-container">
            <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={handleInfiniteOnLoad}
                hasMore={!loading && hasMore}
                useWindow={false}
            >
                <List
                    dataSource={data}
                    size="small"
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <List.Item.Meta
                                avatar={
                                    <Avatar icon={<UserOutlined />} />
                                }
                                title={<a href="https://ant.design">{item.name.last}</a>}
                                description={item.email}
                            />
                            <div>This User did something</div>
                        </List.Item>
                    )}
                >
                    { loading && hasMore ?
                        <div className="demo-loading-container">
                            <Spin />
                        </div>
                     : !loading && !hasMore ?
                        <div style={{textAlign: "center"}}>
                            ...The End <SmileOutlined style={{fontSize:"large"}}/>
                        </div> : null
                    }
                </List>
            </InfiniteScroll>
        </div>
    );

}

export default Activity
