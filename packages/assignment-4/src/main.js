/**
 * 요구사항
 * 상품
  - 상품1 - 10,000원
  - 상품2 - 20,000원
  - 상품3 - 30,000원
* 상품 관리
  - 상품을 장바구니에 추가할 수 있어야 한다.
  - 장바구니에서 상품을 제거할 수 있어야 한다.
  - 각 상품의 수량을 변경할 수 있어야 한다.
* 가격 계산
  - 장바구니 내 모든 상품의 총액을 계산해야 한다.
  - 개별 상품의 가격과 수량에 따른 소계를 표시해야 한다.
  - 상품1 > 10개 이상 구매 시 10% 할인
  - 상품2 > 10개 이상 구매 시 15% 할인
  - 상품3 > 10개 이상 구매 시 20% 할인
  - 상품 종류와 상관 없이, 30개 이상 구매할 경우 25% 할인
* 기본 기능
  - 장바구니에 상품 추가 기능
  - 장바구니에서 상품 제거 기능
  - 상품 수량 변경 기능
  - 장바구니 내역 조회 기능
  - 총액 계산 기능
 */
function main() {
  /**
   * 상품 목록
   * id: 상품 아이디
   * n: 상품 이름
   * p: 상품 가격
   */
  var p = [
    {id: 'p1', n: '상품1', p: 10000 },
    {id: 'p2', n: '상품2', p: 20000 },
    {id: 'p3', n: '상품3', p: 30000 }
  ];

  /**
   * ct: 장바구니 아이템 목록 cart-items
   * tt: 장바구니 총액 cart-total
   * s: 상품 선택 select
   * ab: 장바구니 추가 버튼 add-to-cart
   */
  var a = document.getElementById('app');
  var w = document.createElement('div');
  var b = document.createElement('div');
  var h = document.createElement('h1');
  var ct = document.createElement('div');
  var tt = document.createElement('div');
  var s = document.createElement('select');
  var ab = document.createElement('button');

  ct.id = 'cart-items';
  tt.id = 'cart-total';
  s.id = 'product-select';
  ab.id = 'add-to-cart';
  w.className = 'bg-gray-100 p-8';
  b.className = 'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
  h.className = 'text-2xl font-bold mb-4';
  tt.className = 'text-xl font-bold my-4';
  s.className = 'border rounded p-2 mr-2';
  ab.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  h.textContent = '장바구니';
  ab.textContent = '추가';

  /**
   * 상품 목록을 select 옵션에 추가
   */
  for (var j = 0; j < p.length; j++) {
    var o = document.createElement('option');
    o.value = p[j].id;
    o.textContent = p[j].n + ' - ' + p[j].p + '원';
    s.appendChild(o);
  }

  /**
   * 화면 그리기
   */
  b.appendChild(h);
  b.appendChild(ct);
  b.appendChild(tt);
  b.appendChild(s);
  b.appendChild(ab);
  w.appendChild(b);
  a.appendChild(w);


  /**
   * updateCart
   * 카트 아이템 변경 시 총액 업데이트
   */
  function uc() {
    var t = 0;
    var tq = 0;
    var items = ct.children;
    var tb = 0;

    for (var m = 0; m < items.length; m++) {
      var item;
      for (var n = 0; n < p.length; n++) {
        if (p[n].id === items[m].id) {
          item = p[n];
          break;
        }
      }
      var quantity = parseInt(items[m].querySelector('span').textContent.split('x ')[1]);
      var itemTotal = item.p * quantity;
      var disc = 0;

      tq += quantity;
      tb += itemTotal;
      // 10개 이상일 때 할인 적용
      if (quantity >= 10) {
        if (item.id === 'p1') disc = 0.1;
        else if (item.id === 'p2') disc = 0.15;
        else if (item.id === 'p3') disc = 0.2;
      }
      t += itemTotal * (1 - disc);
    }

    var dr = 0;
    // 30개 이상일 때 할인 적용
    if (tq >= 30) {
      var bulkDiscount = t * 0.25;
      var individualDiscount = tb - t;
      if (bulkDiscount > individualDiscount) {
        t = tb * 0.75;
        dr = 0.25;
      } else {
        dr = (tb - t) / tb;
      }
    } else {
      dr = (tb - t) / tb;
    }

    tt.textContent = '총액: ' + Math.round(t) + '원';
    if (dr > 0) {
      var dspan = document.createElement('span');
      dspan.className = 'text-green-500 ml-2';
      dspan.textContent = '(' + (dr * 100).toFixed(1) + '% 할인 적용)';
      tt.appendChild(dspan);
    }
  }

  /**
   * 추가 버튼 클릭 시 발생하는 이벤트 처리
   */
  ab.onclick = function() {
    var v = s.value;
    var i;
    for (var k = 0; k < p.length; k++) {
      if (p[k].id === v) {
        i = p[k];
        break;
      }
    }
    if (i) {
      var e = document.getElementById(i.id);
      if (e) {
        var q = parseInt(e.querySelector('span').textContent.split('x ')[1]) + 1;
        e.querySelector('span').textContent = i.n + ' - ' + i.p + '원 x ' + q;
      } else {
        var d = document.createElement('div');
        var sp = document.createElement('span');
        var bd = document.createElement('div');
        var mb = document.createElement('button');
        var pb = document.createElement('button');
        var rb = document.createElement('button');
        d.id = i.id;
        d.className = 'flex justify-between items-center mb-2';
        sp.textContent = i.n + ' - ' + i.p + '원 x 1';
        mb.className = 'quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1';
        mb.textContent = '-';
        mb.dataset.productId = i.id;
        mb.dataset.change = '-1';
        pb.className = 'quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1';
        pb.textContent = '+';
        pb.dataset.productId = i.id;
        pb.dataset.change = '1';
        rb.className = 'remove-item bg-red-500 text-white px-2 py-1 rounded';
        rb.textContent = '삭제';
        rb.dataset.productId = i.id;
        bd.appendChild(mb);
        bd.appendChild(pb);
        bd.appendChild(rb);
        d.appendChild(sp);
        d.appendChild(bd);
        ct.appendChild(d);
      }
      uc();
    }
  };

  /**
   * 장바구니 아이템 목록에 대한 이벤트 처리
   */
  ct.onclick = function(event) {
    var target = event.target;
    if (target.classList.contains('quantity-change') || target.classList.contains('remove-item')) {
      var productId = target.dataset.productId;
      var item = document.getElementById(productId);
      if (target.classList.contains('quantity-change')) {
        var change = parseInt(target.dataset.change);
        var quantity = parseInt(item.querySelector('span').textContent.split('x ')[1]) + change;
        if (quantity > 0) {
          item.querySelector('span').textContent = item.querySelector('span').textContent.split('x ')[0] + 'x ' + quantity;
        } else {
          item.remove();
        }
      } else if (target.classList.contains('remove-item')) {
        item.remove();
      }
      uc();
    }
  };
}

main();
