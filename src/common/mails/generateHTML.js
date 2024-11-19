export const generateEmailContent = (title, fullName) => {
    return `
        <div style="padding: 20px; background-color: #f4f4f9; font-family: Arial, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                <div style="padding: 20px; background-color: #003375; color: white; text-align: center;">
                    <h1 style="margin: 0; font-size: 24px;">${title}</h1>
                </div>
                <div style="padding: 20px;">
                    <p style="font-size: 16px; color: #333;">Chào ${fullName},</p>
                    <p style="font-size: 14px; color: #555;">
                        Cảm ơn bạn đã đăng ký dịch vụ của chúng tôi. Đây là email xác nhận thông tin bạn đã đăng ký.
                    </p>
                    <p style="font-size: 14px; color: #555;">
                        Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email này.
                    </p>
                    <p style="margin-top:30px">
                        <strong>Best regards</strong>
                        <div style="font-style:italic">Team FU</div>
                    </p>
                </div>
                <div style="padding: 20px; background-color: #f4f4f9; text-align: center;">
                    <p style="font-size: 12px; color: #aaa;">© 2024 - FuderrDev-U. Tất cả các quyền được bảo lưu.</p>
                </div>
            </div>
        </div>
    `;
};
