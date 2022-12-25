import React, {useEffect, PureComponent} from 'react'
import {useUnit} from "effector-react";
import {Params, useParams} from "react-router-dom";
import {$grah, $infoCoins, $infoLoading, $priceCoin, graphEvent, InfoLoaded,} from "../stores/showStore";
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import {infoType} from "../type/storeType";
import Loading from "../component/loading";

;
export default function Show() {

    const graph = useUnit($grah);
    const info:infoType = useUnit($infoCoins);
    const params: Params = useParams();
    const loading = useUnit($infoLoading);
    const price = useUnit($priceCoin);

    useEffect(() => {
        InfoLoaded(params.id);
    }, []);


    if(loading) {
        return <Loading/>
    }

    return (
        <div className={params.id}>

            <section>
                <div className="relative max-w-screen-xl px-4 py-8 mx-auto">
                    <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
                            <AreaChart
                                width={500}
                                height={400}
                                data={graph}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="50 50" />
                                <XAxis dataKey="Date" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="Price" stroke="#940D19" fill="#9ED4CF" />
                            </AreaChart>
                        </div>

                        <div className="sticky top-0">


                            <div className="flex justify-between mt-8">
                                <div className="max-w-[35ch]">
                                    <h1 className="text-2xl font-bold">
                                        <a href="info.links" className="block shrink-0">
                                            <span className="sr-only">Profile</span>
                                            <img
                                                alt="logo"
                                                src={info.image}
                                                className="h-10 w-10 rounded-full object-covesr"
                                            />{info.name}
                                        </a>

                                    </h1>

                                    <p className="mt-0.5 text-sm">{info.symbol}</p>


                                </div>

                                <p className="text-lg font-bold">${price}</p>
                            </div>

                            <details
                                className="group relative mt-4 [&_summary::-webkit-details-marker]:hidden"
                            >
                                <summary className="block">
                                    <div>
                                        <div className="prose max-w-none group-open:hidden">
                                            <p>
                                                {info.description.split(".")[0]}
                                            </p>
                                        </div>

                                        <span
                                            className="mt-4 text-sm font-medium underline cursor-pointer group-open:absolute group-open:bottom-0 group-open:left-0 group-open:mt-0"
                                        >
                Read More
              </span>
                                    </div>
                                </summary>

                                <div className="pb-6 prose max-w-none">
                                    <p>
                                        {info.description}
                                    </p>
                                </div>
                            </details>

                            <fieldset className="mt-4">
                                <legend className="mb-1 text-sm font-medium">Links</legend>

                                <div className="flow-root">
                                    <div className="-m-0.5 flex flex-wrap">
                                        <label htmlFor="size_xs" className="cursor-pointer p-0.5">
                                            <input
                                                type="radio"
                                                name="size"
                                                id="size_xs"
                                                className="sr-only peer"
                                            />
                                            <a href={info.links.homepage}>
                                            <span
                                                className="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white"
                                            >
                                                <img src={info.image} alt={'Logo'}/>
                                             </span></a>
                                        </label>

                                        <label htmlFor="size_s" className="cursor-pointer p-0.5">
                                            <input
                                                type="radio"
                                                name="size"
                                                id="size_s"
                                                className="sr-only peer"
                                            />

                                            <a href={info.links.github}>
                                            <span
                                                className="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white"
                                            >
                                                   <svg
                                                       className="h-6 w-6"
                                                       fill="currentColor"
                                                       viewBox="0 0 24 24"
                                                       aria-hidden="true"
                                                               >
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                                        clip-rule="evenodd"
                                                    />
                                                </svg>

                                            </span></a>
                                        </label>

                                        <label htmlFor="size_m" className="cursor-pointer p-0.5">
                                            <input
                                                type="radio"
                                                name="size"
                                                id="size_m"
                                                className="sr-only peer"
                                            />

                                            <a href={info.links.twitter}>
                                            <span
                                                className="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white"
                                            >
                                                <svg
                                                    className="h-6 w-6"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                        <path
                                                            d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                                                        />
                                                    </svg>
                                                </span>
                                            </a>
                                        </label>

                                        <label htmlFor="size_l" className="cursor-pointer p-0.5">
                                            <input
                                                type="radio"
                                                name="size"
                                                id="size_l"
                                                className="sr-only peer"
                                            />

                                            <a href={info.links.reddit}>
                                            <span
                                                className="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white"
                                            >
                                               <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-reddit"
                                                    width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                                    stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z"
                                                                                                          fill="none"/> <path
                                                   d="M12 8c2.648 0 5.028 .826 6.675 2.14a2.5 2.5 0 0 1 2.326 4.36c0 3.59 -4.03 6.5 -9 6.5c-4.875 0 -8.845 -2.8 -9 -6.294l-1 -.206a2.5 2.5 0 0 1 2.326 -4.36c1.646 -1.313 4.026 -2.14 6.674 -2.14z"/> <path
                                                   d="M12 8l1 -5l6 1"/> <circle cx="19" cy="4" r="1"/> <circle cx="9" cy="13" r=".5"
                                                                                                               fill="currentColor"/> <circle cx="15"
                                                                                                                                             cy="13"
                                                                                                                                             r=".5"
                                                                                                                                             fill="currentColor"/> <path
                                                   d="M10 17c.667 .333 1.333 .5 2 .5s1.333 -.167 2 -.5"/> </svg>
                                            </span>
                                            </a>
                                        </label>


                                    </div>
                                </div>
                            </fieldset>


                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}
