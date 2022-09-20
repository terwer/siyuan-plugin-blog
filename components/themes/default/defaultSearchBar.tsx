import React, {useCallback, useState} from 'react';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import './css/searchbar.module.css';
import {Button, Form} from "react-bootstrap";
import clsx from "clsx";
import navbarStyles from "./css/navbar.module.css";
import {getRootBlocks} from "../../../lib/siyuan/siYuanApi";

const CACHE: any = {};
const PER_PAGE = 50;
// const SEARCH_URI = 'https://api.github.com/search/users';

export default function DefaultSearchBar() {
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const [query, setQuery] = useState('');

    const goPage = () => {
        window.location.href = "/s/" + query
    }

    const handleInputChange = (q: string) => {
        setQuery(q);
    };

    const handlePagination = (e: any, shownResults: any) => {
        const cachedQuery = CACHE[query];

        // Don't make another request if:
        // - the cached results exceed the shown results
        // - we've already fetched all possible results
        if (
            cachedQuery.options.length > shownResults ||
            cachedQuery.options.length === cachedQuery.total_count
        ) {
            return;
        }

        setIsLoading(true);

        const page = cachedQuery.page + 1;

        makeAndHandleRequest(query, page).then((resp) => {
            const options = cachedQuery.options.concat(resp.options);
            CACHE[query] = {...cachedQuery, options, page};

            setIsLoading(false);
            setOptions(options);
        });
    };

    // `handleInputChange` updates state and triggers a re-render, so
    // use `useCallback` to prevent the debounced search handler from
    // being cancelled.
    const handleSearch = useCallback((q: string) => {
        if (CACHE[q]) {
            setOptions(CACHE[q].options);
            return;
        }

        setIsLoading(true);
        makeAndHandleRequest(q).then((resp) => {
            CACHE[q] = {...resp, page: 1};

            setIsLoading(false);
            // @ts-ignore
            setOptions(resp.options);
        });
    }, []);

    return (
        <Form className={clsx("d-flex", navbarStyles.sFormGroup)}>
            <AsyncTypeahead
                id="async-pagination-searchbar"
                isLoading={isLoading}
                labelKey="login"
                maxResults={PER_PAGE - 1}
                minLength={1}
                onChange={goPage}
                onInputChange={handleInputChange}
                onPaginate={handlePagination}
                onSearch={handleSearch}
                options={options}
                paginate
                placeholder="请输入关键词"
                searchText="搜索中..."
                emptyLabel="暂无结果"
                paginationText="加载更多"
                promptText="输入关键词搜索"
                renderMenuItemChildren={(option: any) => (
                    <div key={option.id}>
                        <span>{option.login}</span>
                    </div>
                )}
                useCache={false}
            />
            <Button type="button" onClick={goPage}>
                搜索
            </Button>
        </Form>
    );
}

function makeAndHandleRequest(query: any, page = 0) {
    return getRootBlocks(page, PER_PAGE, query).then((items: any) => {
        const options: any = []

        if (items && items.length > 0) {
            items.forEach((i: any) => {
                const item = {
                    id: i.root_id,
                    login: i.content,
                }

                options.push(item)
            });
        }
        console.log("items=>", items)

        const total = options.length;
        const bardata = {options, total}
        console.log("bardata=>", bardata)
        return bardata;
    })

    // return fetch(`${SEARCH_URI}?q=${query}+in:login&page=${page}&per_page=${PER_PAGE}`)
    //     .then((resp) => resp.json())
    //     .then(({items, total_count}) => {
    //         const options = items.map((i: any) => ({
    //             id: i.id,
    //             login: i.login,
    //         }));
    //         return {options, total_count};
    //     });
}