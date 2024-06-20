import { Button, Result } from 'antd';
import { blue } from '@ant-design/colors';
import Link from 'next/link';
const Welcome = () => (
    <div className="my-16 2xl:my-40">
        <Result
        status="success"
        title="Successfully Purchased Your Favorite Course!"
        subTitle="Congratulations on your successful purchase!"
        extra={[
        <Link href="/course" key="course">
            <button type="primary" className='py-1.5 px-4 rounded-lg bg-[#140342] hover:bg-[#130930] text-white hover:text-white'>
            Continue Enroll
            </button>
        </Link>,
        <Link href="/dashboard/courses" key="course2">
            <button type="primary" className='py-1 px-4 rounded-lg border-2 border-[#140342] hover:bg-[#130930] text-[#140342] hover:text-white'>
            My Course
            </button>
        </Link>,
        ]}
    />
  </div>
);
export default Welcome;