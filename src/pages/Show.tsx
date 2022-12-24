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


                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}
