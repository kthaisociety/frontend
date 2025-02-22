'use client';

import {useRef} from 'react';
import {Provider} from 'react-redux';
import {makeStore, AppStore} from '@/lib/model/store';

const StoreProvider = ({children} : {children: React.ReactNode}) => {
	const storeRef = useRef<AppStore | null>(null);
    if(!storeRef.current){
        storeRef.current = makeStore();
    }
	return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
