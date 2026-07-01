/**
 * 医捷通 MedConnect Global - 主脚本文件
 */

// ============================================
// 全局变量
// ============================================
let currentSlide = 0;
const totalSlides = 3;
let slideInterval;

// ============================================
// DOM 加载完成后执行
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initHeader();
    initBanner();
    initForms();
    initMobileMenu();
    initAdmin();
});

// ============================================
// Header 滚动效果
// ============================================
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// Banner 轮播
// ============================================
function initBanner() {
    startAutoSlide();
}

function startAutoSlide() {
    slideInterval = setInterval(function() {
        changeSlide(1);
    }, 5000);
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.banner-dot');
    
    if (slides.length === 0) return;
    
    stopAutoSlide();
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide += direction;
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    startAutoSlide();
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.banner-dot');
    
    if (slides.length === 0) return;
    
    stopAutoSlide();
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    startAutoSlide();
}

// ============================================
// 表单处理
// ============================================
function initForms() {
    // 快速咨询表单
    const quickContactForm = document.getElementById('quickContactForm');
    if (quickContactForm) {
        quickContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this, '咨询提交成功！我们将在24小时内与您联系。');
        });
    }

    // 预约表单
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this, '预约提交成功！我们将尽快确认您的预约信息。');
        });
    }

    // 联系表单
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this, '感谢您的留言！我们将尽快回复您。');
        });
    }

    // 专家预约表单
    const expertBookingForm = document.getElementById('expertBookingForm');
    if (expertBookingForm) {
        expertBookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this, '专家预约申请已提交！我们将为您匹配合适的专家。');
        });
    }
}

function handleFormSubmit(form, successMessage) {
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    console.log('Form submitted:', data);
    
    // 显示成功提示
    showNotification(successMessage, 'success');
    form.reset();
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 12px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================
// 移动端菜单
// ============================================
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// ============================================
// 服务筛选
// ============================================
function filterServices(category) {
    const tabs = document.querySelectorAll('.service-tab');
    const cards = document.querySelectorAll('.service-card');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    cards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'block';
        } else {
            // 根据卡片内容筛选（这里简化处理）
            card.style.display = 'block';
        }
    });
}

// ============================================
// 预约流程
// ============================================
let currentStep = 1;

function nextStep() {
    if (currentStep < 4) {
        document.getElementById(`step-${currentStep}`).classList.remove('active');
        document.getElementById(`step-${currentStep}`).classList.add('completed');
        currentStep++;
        document.getElementById(`step-${currentStep}`).classList.add('active');
        updateStepContent();
    }
}

function prevStep() {
    if (currentStep > 1) {
        document.getElementById(`step-${currentStep}`).classList.remove('active');
        currentStep--;
        document.getElementById(`step-${currentStep}`).classList.remove('completed');
        document.getElementById(`step-${currentStep}`).classList.add('active');
        updateStepContent();
    }
}

function updateStepContent() {
    // 更新步骤内容显示
    const content = document.getElementById('step-content');
    if (content) {
        content.innerHTML = getStepContent(currentStep);
    }
}

function getStepContent(step) {
    const contents = {
        1: '<h3>选择服务类型</h3><p>请选择您需要的服务类型</p>',
        2: '<h3>填写预约信息</h3><p>请提供您的基本信息和就医需求</p>',
        3: '<h3>上传病历资料</h3><p>请上传相关病历和检查报告</p>',
        4: '<h3>确认支付</h3><p>选择支付方式完成预约</p>'
    };
    return contents[step] || '';
}

// ============================================
// 后台管理系统
// ============================================
function initAdmin() {
    // 仪表盘数据
    updateDashboard();
    
    // 客户管理
    loadCustomers();
    
    // 预约管理
    loadBookings();
    
    // 专家管理
    loadExperts();
    
    // 财务管理
    loadFinances();
}

function updateDashboard() {
    const statCards = document.querySelectorAll('.admin-stat-card');
    // 模拟数据更新
    console.log('Dashboard updated');
}

function loadCustomers() {
    const tableBody = document.querySelector('#customersTable tbody');
    if (!tableBody) return;
    
    // 模拟客户数据
    const customers = [
        { id: 'C001', name: '张伟', phone: '+1 555-0101', email: 'zhang@example.com', date: '2026-06-28', status: 'active' },
        { id: 'C002', name: '李娜', phone: '+1 555-0102', email: 'li@example.com', date: '2026-06-27', status: 'active' },
        { id: 'C003', name: '王强', phone: '+1 555-0103', email: 'wang@example.com', date: '2026-06-26', status: 'inactive' },
        { id: 'C004', name: '陈静', phone: '+1 555-0104', email: 'chen@example.com', date: '2026-06-25', status: 'active' },
    ];
    
    // 渲染表格（实际使用中通过模板引擎）
    // tableBody.innerHTML = ...
}

function loadBookings() {
    const tableBody = document.querySelector('#bookingsTable tbody');
    if (!tableBody) return;
    
    // 模拟预约数据
    const bookings = [
        { id: 'B001', customer: '张伟', expert: '李明华', service: '专家门诊预约', date: '2026-07-01', status: 'pending' },
        { id: 'B002', customer: '李娜', expert: '王建国', service: '远程视频咨询', date: '2026-07-02', status: 'confirmed' },
        { id: 'B003', customer: '王强', expert: '张伟', service: '全程陪同', date: '2026-06-30', status: 'completed' },
    ];
    
    // 渲染表格
}

function loadExperts() {
    const tableBody = document.querySelector('#expertsTable tbody');
    if (!tableBody) return;
    
    // 模拟专家数据
}

function loadFinances() {
    const tableBody = document.querySelector('#financesTable tbody');
    if (!tableBody) return;
    
    // 模拟财务数据
}

// ============================================
// 模态框
// ============================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 关闭模态框（点击外部区域）
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// 文件上传预览
// ============================================
function handleFileUpload(input, previewId) {
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById(previewId);
            if (preview) {
                preview.src = e.target.result;
                preview.style.display = 'block';
            }
        };
        reader.readAsDataURL(file);
    }
}

// ============================================
// 标签页切换
// ============================================
function switchTab(tabGroup, tabId) {
    const group = document.querySelector(`[data-tab-group="${tabGroup}"]`);
    if (!group) return;
    
    const tabs = group.querySelectorAll('.tab-btn');
    const contents = group.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');
}

// ============================================
// 价格计算
// ============================================
function calculatePrice() {
    const serviceType = document.getElementById('serviceType')?.value;
    const addOns = document.querySelectorAll('.addon:checked');
    let basePrice = 0;
    
    switch(serviceType) {
        case 'consultation':
            basePrice = 89;
            break;
        case 'booking':
            basePrice = 199;
            break;
        case 'accompany':
            basePrice = 260;
            break;
        default:
            basePrice = 0;
    }
    
    let total = basePrice;
    addOns.forEach(addon => {
        total += parseFloat(addon.dataset.price || 0);
    });
    
    const totalElement = document.getElementById('totalPrice');
    if (totalElement) {
        totalElement.textContent = '$' + total.toFixed(0);
    }
    
    return total;
}

// ============================================
// 动画关键帧
// ============================================
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);

// ============================================
// 导出函数供外部使用
// ============================================
window.MedConnect = {
    changeSlide,
    goToSlide,
    filterServices,
    nextStep,
    prevStep,
    openModal,
    closeModal,
    calculatePrice,
    showNotification
};
