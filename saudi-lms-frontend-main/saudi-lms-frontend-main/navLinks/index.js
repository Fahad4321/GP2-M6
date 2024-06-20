
import { MdSpaceDashboard, MdAssignment } from 'react-icons/md';
import { FaDiscourse } from 'react-icons/fc';
import { BiMessageSquareDots } from 'react-icons/bi';
import { AiOutlineSchedule } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io';




export const navLiks = [
    {
        id: '',
        title: 'Dashboard',
        icon: <MdSpaceDashboard />
    },
    {
        id: 'courses',
        title: 'My Courses',
        icon: <FaDiscourse />
    },
    {
        id: 'assignments',
        title: 'Assignments',
        icon: <MdAssignment />
    },
    {
        id: 'messages',
        title: 'Message',
        icon: <BiMessageSquareDots />
    },
    {
        id: 'schedule',
        title: 'Schedules',
        icon: <AiOutlineSchedule />
    },
    {
        id: 'settings',
        title: 'Settings',
        icon: <IoSettingsOutline />
    },
]