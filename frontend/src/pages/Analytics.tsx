import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Activity, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { urlService } from '../services/urlService';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { format, subDays } from 'date-fns';
import toast from 'react-hot-toast';
import './Analytics.css';

export const Analytics = () => {
    const [totalClicksData, setTotalClicksData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dateRange, setDateRange] = useState(7);

    useEffect(() => {
        fetchAnalytics();
    }, [dateRange]);

    const fetchAnalytics = async () => {
        setIsLoading(true);
        try {
            const endDate = new Date();
            const startDate = subDays(endDate, dateRange);

            const data = await urlService.getTotalClicks(
                format(startDate, 'yyyy-MM-dd'),
                format(endDate, 'yyyy-MM-dd')
            );

            const chartData = Object.entries(data).map(([date, clicks]) => ({
                date: format(new Date(date), 'MMM dd'),
                fullDate: format(new Date(date), 'EEEE, MMM dd'),
                clicks: clicks,
            }));

            setTotalClicksData(chartData);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch analytics';
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const totalClicks = totalClicksData.reduce((sum, item) => sum + item.clicks, 0);
    const avgClicksPerDay = totalClicksData.length > 0 ? Math.round(totalClicks / totalClicksData.length) : 0;
    const maxClicks = Math.max(...totalClicksData.map(d => d.clicks), 0);
    const lastDayClicks = totalClicksData[totalClicksData.length - 1]?.clicks || 0;
    const previousDayClicks = totalClicksData[totalClicksData.length - 2]?.clicks || 0;
    const trend = previousDayClicks > 0 ? ((lastDayClicks - previousDayClicks) / previousDayClicks * 100).toFixed(1) : 0;
    const isPositiveTrend = Number(trend) >= 0;

    if (isLoading) {
        return (
            <div className="analytics-loading">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="analytics-tooltip">
                    <span className="tooltip-label">{payload[0].payload.fullDate}</span>
                    <div className="tooltip-content">
                        <span className="tooltip-number">{payload[0].value}</span>
                        <span className="tooltip-text">clicks</span>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="analytics-page">
            <div className="analytics-wrapper">
                {/* Header */}
                <motion.header
                    className="analytics-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="header-left">
                        <h1>Analytics</h1>
                        <p>Track your link performance</p>
                    </div>
                    <div className="period-selector">
                        {[7, 30, 90].map((days) => (
                            <button
                                key={days}
                                className={`period-btn ${dateRange === days ? 'active' : ''}`}
                                onClick={() => setDateRange(days)}
                            >
                                {days}D
                            </button>
                        ))}
                    </div>
                </motion.header>

                {/* Stats Cards */}
                <motion.div
                    className="stats-row"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="stat-card">
                        <div className="stat-icon blue">
                            <Activity size={20} />
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">Total Clicks</span>
                            <span className="stat-number">{totalClicks.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon purple">
                            <TrendingUp size={20} />
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">Daily Average</span>
                            <span className="stat-number">{avgClicksPerDay}</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon green">
                            <Zap size={20} />
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">Peak Day</span>
                            <span className="stat-number">{maxClicks}</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className={`stat-icon ${isPositiveTrend ? 'green' : 'red'}`}>
                            {isPositiveTrend ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                        </div>
                        <div className="stat-info">
                            <span className="stat-label">Trend</span>
                            <span className={`stat-number ${isPositiveTrend ? 'positive' : 'negative'}`}>
                                {isPositiveTrend ? '+' : ''}{trend}%
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Main Chart */}
                {totalClicksData.length > 0 ? (
                    <motion.div
                        className="chart-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="chart-container">
                            <div className="chart-header">
                                <h2>Click Activity</h2>
                                <div className="chart-meta">
                                    <Calendar size={14} />
                                    <span>Last {dateRange} days</span>
                                </div>
                            </div>
                            <div className="chart-area">
                                <ResponsiveContainer width="100%" height={320}>
                                    <AreaChart
                                        data={totalClicksData}
                                        margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                                    >
                                        <defs>
                                            <linearGradient id="clickGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#B19EEF" stopOpacity={0.3} />
                                                <stop offset="100%" stopColor="#B19EEF" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis
                                            dataKey="date"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#64748b', fontSize: 12 }}
                                            dy={10}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: '#64748b', fontSize: 12 }}
                                            dx={-10}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Area
                                            type="monotone"
                                            dataKey="clicks"
                                            stroke="#B19EEF"
                                            strokeWidth={2.5}
                                            fill="url(#clickGradient)"
                                            dot={false}
                                            activeDot={{
                                                r: 6,
                                                fill: '#B19EEF',
                                                stroke: '#fff',
                                                strokeWidth: 2
                                            }}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Daily Breakdown */}
                        <div className="breakdown-container">
                            <h3>Daily Breakdown</h3>
                            <div className="breakdown-list">
                                {totalClicksData.slice().reverse().map((item, index) => (
                                    <motion.div
                                        key={item.date}
                                        className="breakdown-item"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <div className="breakdown-date">
                                            <Calendar size={14} />
                                            <span>{item.fullDate}</span>
                                        </div>
                                        <div className="breakdown-bar-wrapper">
                                            <div
                                                className="breakdown-bar"
                                                style={{
                                                    width: `${maxClicks > 0 ? (item.clicks / maxClicks) * 100 : 0}%`
                                                }}
                                            />
                                        </div>
                                        <span className="breakdown-clicks">{item.clicks}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        className="empty-analytics"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Activity size={48} />
                        <h2>No Data Yet</h2>
                        <p>Click data will appear here once your links are used</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
