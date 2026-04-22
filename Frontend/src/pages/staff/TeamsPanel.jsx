import {
	Calendar,
	MessageSquare,
	Clock,
	Bell,
	Bone,
	CheckCircle,
	CreditCard,
	FileText,
	Info,
} from "lucide-react";
import toothIcon from "../../assets/logo/tooth-normal.svg";
import { useAuth } from "../../context/AuthContext";
import { TodayAppointments, AgendaCalendar, MetricsCards } from "../index";

const TeamsPanel = () => {
	return (
		<div className='p-6 bg-gray-50 min-h-screen text-gray-900'>
			{/* Header */}
			<div className='mb-8'>
				<h1 className='text-2xl font-bold'>Bienvenido/a</h1>
				<p className='text-gray-600'>Martes, 21 de abril de 2026</p>
			</div>
			{/* 🔹 MÉTRICAS */}
			<MetricsCards />
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 py-3'>
				{/* Lista */}
				<TodayAppointments />
				{/* Calendario */}
				<AgendaCalendar />
			</div>
		</div>
	);
};

export default TeamsPanel;
