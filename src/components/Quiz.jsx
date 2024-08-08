import React, { useMemo, useState } from 'react'
import questionIcon from './icons/question-icon.svg'
import likeiIcon from './icons/like-icon.svg'
import chartIcon from './icons/chart-icon.svg'
import commitIcon from './icons/commit-icon.svg'
import shareIcon from './icons/share-icon.svg'

const apiDATA = {
    content: "🔥 Want to speak English, Read this first like a native speaker? Read this like a native speaker? Read this first.",
    like: "99",
    chart: "28",
    commit: "29",
    share: "88",
    notPossible: {
        users: [
            { userId: 1, image: "" },
            { userId: 1, image: "" },
            { userId: 1, image: "" },
            { userId: 1, image: "" },
            { userId: 1, image: "" },
            { userId: 1, image: "" },
            { userId: 1, image: "" },
            { userId: 1, image: "" },
            { userId: 1, image: "" },
            { userId: 1, image: "" }
        ]
    },
    happeningNow: {
        users: [
            { userId: 1, image: "" },
            { userId: 1, image: "" },
            { userId: 1, image: "" },
            { userId: 1, image: "" }
        ]
    }
};

const Quiz = () => {

    const [data, setData] = useState(apiDATA);
    const [isSelected, setIsSelected] = useState(true);

    const { content, like, chart, commit, share, notPossible, happeningNow } = data;

    const { percentage } = useMemo(() => {
        const totalVote = notPossible.users.length + happeningNow.users.length;
        const percentage = {
            happeningNow: ((happeningNow.users.length / totalVote) * 100).toFixed(0),
            notPossible: ((notPossible.users.length / totalVote) * 100).toFixed(0)
        }
        return { percentage }
    }, [happeningNow.users.length, notPossible.users.length]);

    return (
        <div className='flex flex-col gap-[16px] border p-[16px] w-[640px]'>

            {/* tabs */}
            <div className={`flex items-center ${!isSelected && "gap-[10px]"}`}>
                <div className={`group relative mx-2`} style={{ width: isSelected ? `${percentage.notPossible}%` : '100%' }}>
                    <button className={`relative w-full px-6 py-2 border border-[#1C2024] ${isSelected ? "rounded-full" : "rounded-s-full"} font-[700] text-[#1C2024] bg-white group-hover:bg-[#F0F0F3]`}>
                        {isSelected ? `${percentage.notPossible}%` : "Not Possible"}
                    </button>
                    {!isSelected && <div className={`absolute inset-y-0 right-0 w-4 -mr-2 border-t border-b border-r border-[#1C2024] -skew-x-12 bg-white group-hover:bg-[#F0F0F3]`}></div>
                    }
                </div>

                <div className={`group relative mx-2`} style={{ width: isSelected ? `${percentage.happeningNow}%` : '100%' }}>
                    <button className={`relative w-full px-6 py-2 border border-[#1C2024]  ${isSelected ? "rounded-full" : "rounded-e-full"} font-[700] text-[#1C2024] bg-white group-hover:bg-[#F0F0F3]`}>
                        {isSelected ? `${percentage.happeningNow}%` : "Happening Now"}
                    </button>
                    {!isSelected && <div className={`absolute inset-y-0 left-0 w-4 -ml-2 border-t border-b border-l border-[#1C2024] -skew-x-12 bg-white group-hover:bg-[#F0F0F3]`}></div>}
                </div>
            </div>
            {/* tabs end */}

            <div className="flex items-center bg-[#F0F0F3] p-[8px] rounded-md">
                <p className="flex-1 text-[#60646C] hover:underline">{content}</p>
            </div>

            {/* footer  */}

            <div className='flex justify-between items-center'>

                <div className='group flex items-center gap-[4px] bg-[#FFC53D] rounded-full hover:bg-[#F4D10016]'>
                    <div className='w-[22px] h-[22px] bg-black rounded-full flex items-center justify-center'>
                        <img src={questionIcon} alt="icon" />
                    </div>
                    <div className='text-[13px] text-[#FFFFFF] pe-[8px] group-hover:text-[#FFC53D]'>1024 SOC</div>
                </div>

                <div className='flex gap-[24px]'>

                    <div className='flex items-center gap-[4px]'>
                        <div className='size-[24px] p-[4px] rounded-full hover:bg-[#F0F0F3]'>
                            <img src={likeiIcon} alt="icon" />
                        </div>
                        <div className='text-[#60646C] text-[13px] font-[400]'>{like}</div>
                    </div>

                    <div className='flex items-center gap-[4px]'>
                        <div className='size-[24px] p-[4px] rounded-full hover:bg-[#F0F0F3]'>
                            <img src={chartIcon} alt="icon" />
                        </div>
                        <div className='text-[#60646C] text-[13px] font-[400]'>{chart}</div>
                    </div>

                    <div className='flex items-center gap-[4px]'>
                        <div className='size-[24px] p-[4px] rounded-full hover:bg-[#F0F0F3]'>
                            <img src={commitIcon} alt="icon" />
                        </div>
                        <div className='text-[#60646C] text-[13px] font-[400]'>{commit}</div>
                    </div>

                    <div className='flex items-center gap-[4px]'>
                        <div className='size-[24px] p-[4px] rounded-full hover:bg-[#F0F0F3]'>
                            <img src={shareIcon} alt="icon" />
                        </div>
                        <div className='text-[#60646C] text-[13px] font-[400]'>{share}</div>
                    </div>

                </div>

            </div>

        </div>
    )
}

function Button({ children, isSelected, align, percentage }) {
    <div className={`group relative mx-2`} style={{ width: isSelected ? `${percentage.notPossible}%` : '100%' }}>
        <button className={`relative w-full px-6 py-2 border border-[#1C2024] ${isSelected ? "rounded-full" : "rounded-s-full"} font-[700] text-[#1C2024] bg-white group-hover:bg-[#F0F0F3]`}>
            {isSelected ? `${percentage.notPossible}%` : "Not Possible"}
        </button>
        {!isSelected && <div className={`absolute inset-y-0 right-0 w-4 -mr-2 border-t border-b border-r border-[#1C2024] -skew-x-12 bg-white group-hover:bg-[#F0F0F3]`}></div>
        }
    </div>
}

export default Quiz