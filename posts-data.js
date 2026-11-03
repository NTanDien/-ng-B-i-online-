// ==========================================================================
// CỔNG THÔNG TIN DÂN SINH & DIỄN ĐÀN ĐĂNG BÀI CỘNG ĐỒNG
// DỮ LIỆU BÀI VIẾT DÂN SINH & PHẢN ÁNH THỰC TẾ ĐỜI SỐNG
// ==========================================================================

const INITIAL_POSTS = [
  {
    id: "post-vneid-bhyt",
    title: "Hướng dẫn người dân tích hợp và xuất trình thẻ Bảo hiểm Y tế trên ứng dụng VNeID",
    category: "chinh-sach",
    categoryName: "Chính Sách & Thủ Tục",
    categoryBadgeClass: "badge-policy",
    author: "Bộ phận Tiếp nhận & Trả kết quả",
    authorRole: "Cán bộ Hành chính công",
    date: "03/11/2026",
    timeAgo: "1 giờ trước",
    views: 1820,
    likes: 245,
    isFeatured: true,
    location: "Toàn quốc",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    summary: "Người dân có thể sử dụng hình ảnh thẻ BHYT trên ứng dụng định danh điện tử VNeID để khám chữa bệnh tại tất cả các trạm y tế và bệnh viện trên toàn quốc mà không cần mang theo thẻ giấy.",
    content: `
      <p>Nhằm tạo điều kiện thuận lợi tối đa cho bà con nhân dân khi đi khám chữa bệnh, Bảo hiểm Xã hội phối hợp cùng Bộ Công an đã hoàn thành việc đồng bộ dữ liệu thẻ BHYT lên ứng dụng Định danh điện tử Quốc gia (VNeID).</p>
      
      <h3>1. Các bước tích hợp thẻ BHYT trên VNeID:</h3>
      <ul>
        <li><strong>Bước 1:</strong> Đăng nhập vào ứng dụng VNeID phiên bản mới nhất trên điện thoại thông minh.</li>
        <li><strong>Bước 2:</strong> Chọn mục <em>"Ví giấy tờ"</em> ở thanh công cụ phía dưới, sau đó chọn <em>"Tích hợp thông tin"</em>.</li>
        <li><strong>Bước 3:</strong> Nhấn chọn <em>"Tạo mới yêu cầu"</em>, chọn loại thông tin là <em>"Bảo hiểm Y tế"</em>.</li>
        <li><strong>Bước 4:</strong> Nhập chính xác mã số thẻ BHYT của bạn và đơn vị phát hành, sau đó bấm gửi yêu cầu xác thực.</li>
      </ul>

      <h3>2. Cách xuất trình khi đi khám chữa bệnh:</h3>
      <p>Khi đến trạm y tế hoặc bệnh viện, người dân chỉ cần mở ứng dụng VNeID, vào phần <strong>Ví giấy tờ &rarr; Thẻ Bảo hiểm Y tế</strong> và đưa mã QR hoặc hình ảnh thẻ cho nhân viên y tế quét kiểm tra. Việc này giúp tiết kiệm thời gian làm thủ tục, tránh tình trạng rách hoặc mất thẻ giấy.</p>

      <blockquote class="post-quote">
        "Việc chuyển đổi số trong y tế và bảo hiểm là bước tiến quan trọng vì nhân dân phục vụ, mang lại sự tiện ích, nhanh chóng cho mọi người dân từ thành thị đến nông thôn."
      </blockquote>
    `,
    comments: [
      {
        id: "c1",
        name: "Bác Nguyễn Văn Bình (Hà Nội)",
        date: "03/11/2026 10:15",
        text: "Tôi đã thử làm theo hướng dẫn hôm qua đi khám ở bệnh viện Bạch Mai rất tiện lợi, nhân viên y tế quét mã là xong ngay!"
      },
      {
        id: "c2",
        name: "Cô Lê Thị Mai (Đà Nẵng)",
        date: "03/11/2026 11:30",
        text: "Cảm ơn ban biên tập đã có bài hướng dẫn chi tiết, chữ to rõ ràng rất dễ xem cho người cao tuổi."
      }
    ]
  },
  {
    id: "post-luong-huu-atm",
    title: "Thông báo lịch chi trả lương hưu và trợ cấp an sinh xã hội tháng 11 qua tài khoản cá nhân",
    category: "chinh-sach",
    categoryName: "Chính Sách & Thủ Tục",
    categoryBadgeClass: "badge-policy",
    author: "Bảo Hiểm Xã Hội Cơ Sở",
    authorRole: "Cơ quan Nhà nước",
    date: "02/11/2026",
    timeAgo: "1 ngày trước",
    views: 3120,
    likes: 418,
    isFeatured: true,
    location: "Các tỉnh thành phố",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    summary: "Cơ quan Bảo hiểm Xã hội thông báo kế hoạch chi trả lương hưu, trợ cấp BHXH hàng tháng đúng hạn và an toàn cho người thụ hưởng qua thẻ ATM và tại các điểm bưu điện văn hóa xã.",
    content: `
      <p>Thực hiện chính sách an sinh xã hội của Đảng và Nhà nước, cơ quan Bảo hiểm Xã hội kính gửi đến các bác, các cô chú cán bộ hưu trí và người có công lịch chi trả lương hưu tháng này:</p>
      
      <h3>1. Đối với người nhận qua tài khoản ngân hàng (ATM):</h3>
      <p>Tiền lương hưu sẽ được chuyển thẳng vào tài khoản của người hưởng từ ngày <strong>03 đến ngày 05 hàng tháng</strong>. Bà con không cần phải xếp hàng hay đi lại vất vả.</p>

      <h3>2. Đối với người nhận tiền mặt:</h3>
      <p>Cơ quan bưu điện sẽ tổ chức chi trả trực tiếp tại Nhà văn hóa thôn, tổ dân phố từ ngày <strong>06 đến ngày 15 hàng tháng</strong>. Đối với các cụ già yếu, bệnh tật không thể đi lại, nhân viên bưu điện sẽ phối hợp cùng tổ dân phố mang tiền phát tận nhà.</p>

      <p>Nếu có bất kỳ thắc mắc nào, người dân vui lòng liên hệ đường dây nóng hỗ trợ: <strong>1900 9068</strong> để được giải đáp tận tình.</p>
    `,
    comments: [
      {
        name: "Trần Quốc Toản (Hưu trí)",
        date: "02/11/2026 15:40",
        text: "Sáng nay tôi đã nhận được thông báo lương hưu vào tài khoản rất đúng giờ. Rất hài lòng."
      }
    ]
  },
  {
    id: "post-phan-anh-duong-xa",
    title: "[Ý kiến nhân dân] Phản ánh đoạn đường liên thôn xóm 3 cần duy tu, dặm vá trước mùa mưa lũ",
    category: "phan-anh",
    categoryName: "Phản Ánh Dân Sinh",
    categoryBadgeClass: "badge-feedback",
    status: "Đang giải quyết",
    statusCode: "processing",
    author: "Bà con xóm 3, xã Tân Lập",
    authorRole: "Người dân phản ánh",
    date: "01/11/2026",
    timeAgo: "2 ngày trước",
    views: 1980,
    likes: 290,
    isFeatured: false,
    location: "Xã Tân Lập, Huyện Đan Phượng, Hà Nội",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    summary: "Người dân xóm 3 gửi phản ánh về đoạn đường dài khoảng 500m xuất hiện một số điểm sụt lún gây khó khăn cho việc đi lại của các cháu học sinh và bà con đưa nông sản ra chợ.",
    content: `
      <p><strong>Kính gửi:</strong> Ủy ban Nhân dân và Ban Quản lý Hạ tầng giao thông cơ sở.</p>
      
      <p>Chúng tôi là các hộ dân sinh sống tại xóm 3, xã Tân Lập. Thời gian qua, do lưu lượng xe vận chuyển nông sản và ảnh hưởng của các đợt mưa lớn gần đây, đoạn đường bê tông nối từ xóm 3 ra đường trục chính xã xuất hiện một số điểm sụt lún và ổ gà, gây đọng nước.</p>
      
      <p>Đoạn đường này hàng ngày có nhiều cháu học sinh đi xe đạp đến trường và bà con chở rau màu đi bán buổi sáng sớm, tiềm ẩn nguy cơ té ngã khi trời tối.</p>

      <h3>Ý kiến kiến nghị:</h3>
      <p>Kính đề nghị chính quyền địa phương xem xét, cho rải dăm hoặc đổ bê tông dặm vá tạm thời các vị trí trũng để bà con đi lại an toàn, đồng thời đưa vào kế hoạch nâng cấp hạ tầng giao thông nông thôn mới trong quý tới.</p>

      <div class="feedback-official-reply">
        <h4><i class="fa-solid fa-building-flag"></i> Phản hồi từ UBND Xã (Ngày 02/11/2026):</h4>
        <p><em>"UBND xã đã cử cán bộ giao thông nông thôn xuống kiểm tra thực địa tại xóm 3. Đã bố trí kinh phí bảo trì giao thông để đổ bê tông khắc phục các vị trí sụt lún trong tuần này. Trân trọng cảm ơn ý kiến đóng góp kịp thời của bà con!"</em></p>
      </div>
    `,
    comments: [
      {
        name: "Bác Hòa (Trưởng thôn)",
        date: "02/11/2026 14:00",
        text: "Sáng nay cán bộ xã đã xuống cắm biển báo và khảo sát rồi, bà con rất phấn khởi và hoan nghênh tinh thần lắng nghe của chính quyền."
      }
    ]
  },
  {
    id: "post-nong-nghiep-cong-nghe-cao",
    title: "Mô hình nông nghiệp xanh ứng dụng tưới tiết kiệm: Giúp nông dân tăng 30% thu nhập vụ đông",
    category: "doi-song",
    categoryName: "Đời Sống & Nông Nghiệp",
    categoryBadgeClass: "badge-life",
    author: "Hội Nông Dân Xã",
    authorRole: "Hỗ trợ khuyến nông",
    date: "01/11/2026",
    timeAgo: "2 ngày trước",
    views: 1450,
    likes: 215,
    isFeatured: false,
    location: "Vùng trồng rau an toàn",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
    summary: "Hội Nông dân triển khai gói vay vốn ưu đãi và chuyển giao kỹ thuật tưới nhỏ giọt kết hợp phủ bạt sinh học, giúp tiết kiệm 50% lượng nước và công chăm sóc.",
    content: `
      <p>Trong bối cảnh biến đổi khí hậu và thời tiết thất thường, việc chuyển đổi cơ cấu cây trồng và ứng dụng khoa học kỹ thuật là chìa khóa giúp bà con nông dân ổn định kinh tế gia đình.</p>

      <h3>1. Hiệu quả thực tế từ mô hình:</h3>
      <p>Gia đình ông Trần Văn Hùng (xã Yên Bình) chia sẻ: <em>"Trước đây tưới bằng tay mất cả ngày, giờ chỉ cần bật van hẹn giờ qua điện thoại là vườn rau được tưới đều, cây ít sâu bệnh hẳn, sản lượng vụ này tăng gần một phần ba."</em></p>

      <h3>2. Chính sách hỗ trợ cho bà con nông dân:</h3>
      <ul>
        <li>Hỗ trợ 50% chi phí lắp đặt hệ thống đường ống và đầu tưới tự động.</li>
        <li>Tập huấn kỹ thuật miễn phí vào ngày thứ Bảy hàng tuần tại Hợp tác xã.</li>
        <li>Kết nối đầu ra bao tiêu nông sản sạch tới các siêu thị và bếp ăn trường học.</li>
      </ul>
    `,
    comments: []
  },
  {
    id: "post-y-te-tiem-chung-xa",
    title: "Thông báo lịch tiêm chủng mở rộng miễn phí cho trẻ dưới 5 tuổi tháng 11 tại Trạm Y tế",
    category: "y-te",
    categoryName: "Y Tế & Sức Khỏe",
    categoryBadgeClass: "badge-health",
    author: "Trạm Y Tế Cơ Sở",
    authorRole: "Cán bộ Y tế phường/xã",
    date: "31/10/2026",
    timeAgo: "3 ngày trước",
    views: 3450,
    likes: 512,
    isFeatured: false,
    location: "Tất cả các trạm y tế cơ sở",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    summary: "Các bậc phụ huynh lưu ý đưa trẻ em đến tiêm chủng đúng lịch để phòng ngừa các bệnh truyền nhiễm nguy hiểm. Thuốc tiêm hoàn toàn miễn phí trong chương trình tiêm chủng quốc gia.",
    content: `
      <p>Nhằm bảo vệ sức khỏe cho thế hệ mầm non tương lai, Trạm Y tế cơ sở xin thông báo đến các ông bố, bà mẹ và gia đình lịch tiêm chủng thường kỳ:</p>
      
      <h3>1. Thời gian và địa điểm:</h3>
      <ul>
        <li><strong>Thời gian:</strong> Sáng từ 7h30 - 11h30 các ngày 08, 09 và 10 tháng 11/2026.</li>
        <li><strong>Địa điểm:</strong> Phòng tiêm chủng Trạm Y tế xã/phường (bà con đến theo khung giờ trên giấy mời để không phải chờ lâu).</li>
      </ul>

      <h3>2. Các loại vắc xin tiêm đợt này:</h3>
      <p>Vắc xin 5 trong 1 (Bạch hầu, Ho gà, Uốn ván, Viêm gan B, Hib), vắc xin bại liệt (uống và tiêm), vắc xin phòng Sởi - Rubella cho các cháu tròn 9 tháng và 18 tháng tuổi.</p>

      <blockquote class="post-quote">
        "Tiêm chủng đầy đủ và đúng lịch là quyền lợi của trẻ em và là trách nhiệm yêu thương của mỗi gia đình."
      </blockquote>
    `,
    comments: [
      {
        name: "Chị Hoàng Thị Lan (Phụ huynh)",
        date: "01/11/2026 08:30",
        text: "Trạm y tế chuẩn bị chu đáo lắm, có cả quạt mát và khu vực theo dõi sau tiêm 30 phút rất yên tâm."
      }
    ]
  },
  {
    id: "post-canh-bao-an-ninh-mang",
    title: "Cảnh báo khẩn: Nhận diện các chiêu trò mạo danh cán bộ Công an, Viện kiểm sát gọi điện lừa đảo",
    category: "an-ninh",
    categoryName: "An Ninh & Pháp Luật",
    categoryBadgeClass: "badge-security",
    author: "Công An Cơ Sở",
    authorRole: "Cơ quan An ninh trật tự",
    date: "30/10/2026",
    timeAgo: "4 ngày trước",
    views: 6120,
    likes: 830,
    isFeatured: true,
    location: "Khuyến cáo toàn dân",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    summary: "Công an các cấp khẳng định: Không bao giờ làm việc, yêu cầu chuyển tiền hay yêu cầu cung cấp mã OTP ngân hàng qua điện thoại. Khi có việc, cơ quan chức năng sẽ gửi giấy mời trực tiếp.",
    content: `
      <p>Thời gian qua, một số kẻ xấu đã lợi dụng công nghệ giả mạo số điện thoại của cơ quan nhà nước để gọi điện cho người dân, đặc biệt là người cao tuổi và phụ nữ ở nhà, với các thủ đoạn tinh vi:</p>

      <h3>1. Các kịch bản lừa đảo thường gặp:</h3>
      <ul>
        <li>Thông báo bà con "có liên quan đến đường dây rửa tiền, ma túy" và đe dọa bắt giữ.</li>
        <li>Yêu cầu chuyển toàn bộ tiền tiết kiệm vào "tài khoản an toàn của cơ quan điều tra" để kiểm tra.</li>
        <li>Yêu cầu cài đặt ứng dụng lạ qua đường link lạ (chứa mã độc chiếm quyền điều khiển tài khoản ngân hàng).</li>
      </ul>

      <h3>2. Ba nguyên tắc vàng để phòng ngừa:</h3>
      <ol>
        <li><strong>KHÔNG CUNG CẤP:</strong> Tuyệt đối không đọc mật khẩu ngân hàng, mã OTP cho bất kỳ ai.</li>
        <li><strong>KHÔNG CHUYỂN TIỀN:</strong> Cơ quan pháp luật không có tài khoản tạm giữ nào yêu cầu công dân chuyển tiền qua điện thoại.</li>
        <li><strong>BÁO NGAY CÔNG AN:</strong> Khi nhận cuộc gọi nghi vấn, giữ bình tĩnh, cúp máy và báo cho Công an xã/phường gần nhất.</li>
      </ol>
    `,
    comments: [
      {
        name: "Bác Đỗ Đình Cường",
        date: "31/10/2026 09:20",
        text: "Mấy hôm trước có số lạ gọi bảo tôi bị phạt nguội xe máy, tôi nhớ lời nhắc nhở của công an xã nên tắt máy luôn. Cần chia sẻ rộng rãi cho người lớn tuổi biết!"
      }
    ]
  },
  {
    id: "post-doi-bang-lai-online",
    title: "Hướng dẫn thực hiện cấp đổi Giấy phép lái xe trực tuyến tại nhà trên Cổng Dịch vụ công",
    category: "chinh-sach",
    categoryName: "Chính Sách & Thủ Tục",
    categoryBadgeClass: "badge-policy",
    author: "Bộ Phận Tiếp Nhận & Trả Kết Quả",
    authorRole: "Hành chính công",
    date: "29/10/2026",
    timeAgo: "5 ngày trước",
    views: 4210,
    likes: 470,
    isFeatured: false,
    location: "Toàn quốc",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80",
    summary: "Người dân có thể làm thủ tục đổi bằng lái xe ô tô, xe máy qua mạng chỉ với 15 phút, bằng mới được bưu điện chuyển phát tận tay đến tận cửa nhà.",
    content: `
      <p>Để giúp bà con nhân dân không phải xin nghỉ làm, đi lại xa xôi chờ đợi tại các điểm tiếp nhận, quy trình cấp đổi GPLX mức độ 4 đã được tối ưu hóa toàn diện:</p>

      <h3>Hồ sơ cần chuẩn bị sẵn:</h3>
      <ul>
        <li>Ảnh chân dung 3x4 phông nền trắng (chụp rõ nét bằng điện thoại).</li>
        <li>Ảnh chụp 2 mặt Căn cước công dân và Giấy phép lái xe hiện tại.</li>
        <li>Giấy khám sức khỏe lái xe điện tử (do bệnh viện, phòng khám đủ điều kiện cấp có liên thông dữ liệu).</li>
      </ul>

      <h3>Các bước thực hiện nhanh:</h3>
      <p>Truy cập vào <em>dichvucong.gov.vn</em> &rarr; Chọn dịch vụ "Đổi giấy phép lái xe do ngành Giao thông vận tải cấp" &rarr; Điền thông tin cá nhân và tải ảnh hồ sơ &rarr; Thanh toán lệ phí trực tuyến 115.000đ &rarr; Đăng ký nhận kết quả qua chuyển phát bưu điện.</p>
    `,
    comments: []
  },
  {
    id: "post-guong-sang-lang-que",
    title: "[Gương sáng đời thường] Người cựu chiến binh hơn 15 năm tự nguyện vá đường, mở rộng lối đi cho bà con",
    category: "doi-song",
    categoryName: "Đời Sống & Xã Hội",
    categoryBadgeClass: "badge-life",
    author: "Ban Biên Tập Dân Sinh",
    authorRole: "Cộng tác viên cơ sở",
    date: "28/10/2026",
    timeAgo: "6 ngày trước",
    views: 2600,
    likes: 610,
    isFeatured: false,
    location: "Thôn Thượng, Xã Đồng Tâm",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1200&q=80",
    summary: "Dù tuổi đã ngoài 70, bác Lê Văn Thành ngày ngày vẫn cần mẫn cùng chiếc xe rùa chở cát sỏi vá từng ổ gà, hiến đất mở rộng đường liên ngõ, lan tỏa tình làng nghĩa xóm ấm áp.",
    content: `
      <p>Về thăm thôn Thượng những ngày này, đi trên con đường làng phong quang sạch đẹp, nở rộ hoa mười giờ hai bên lối đi, ai cũng nhắc đến bác Lê Văn Thành - người cựu chiến binh giản dị với tấm lòng vì cộng đồng.</p>

      <p>Hơn 15 năm qua, hễ thấy đoạn đường nào bị trũng sau mưa, bác lại tự bỏ tiền túi mua bao xi măng, ít cát sỏi mang đi dặm vá để người già, trẻ nhỏ đi lại không bị trượt ngã. Không chỉ vậy, khi địa phương có chủ trương xây dựng nông thôn mới, bác đã gương mẫu tự nguyện phá dỡ hơn 40 mét tường rào của gia đình để hiến đất mở rộng đường làng từ 2 mét lên 5 mét.</p>

      <blockquote class="post-quote">
        "Mình làm việc này chẳng mong khen thưởng gì đâu, chỉ mong làng xóm đi lại thuận tiện, các cháu đi học an toàn là cái tâm mình thấy thanh thản, vui khỏe mỗi ngày." - Bác Thành tâm sự.
      </blockquote>
    `,
    comments: [
      {
        name: "Nguyễn Thu Trang (Giáo viên)",
        date: "28/10/2026 14:15",
        text: "Kính chúc bác Thành luôn dồi dào sức khỏe! Tấm gương của bác là niềm tự hào của quê hương chúng ta."
      }
    ]
  }
];

const POST_CATEGORIES = [
  { id: "all", name: "Tất Cả Bài Viết", icon: "fa-solid fa-layer-group" },
  { id: "chinh-sach", name: "Chính Sách & Thủ Tục", icon: "fa-solid fa-landmark" },
  { id: "phan-anh", name: "Phản Ánh Dân Sinh", icon: "fa-solid fa-bullhorn" },
  { id: "doi-song", name: "Đời Sống & Nông Nghiệp", icon: "fa-solid fa-seedling" },
  { id: "y-te", name: "Y Tế & Sức Khỏe", icon: "fa-solid fa-heart-pulse" },
  { id: "an-ninh", name: "An Ninh & Pháp Luật", icon: "fa-solid fa-shield-halved" }
];

const SAMPLE_POST_IMAGES = [
  {
    name: "Hành chính công & Số hóa",
    url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Nông nghiệp & Làng quê",
    url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Giao thông & Đường sá",
    url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Y tế & Trạm y tế",
    url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Trường học & Trẻ em",
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Cộng đồng & Xã hội",
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80"
  }
];

