import { setupServer } from 'msw/node';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
  vi,
} from 'vitest';
import { mockApiHandlers, resetMockData } from '../mockApiHandlers';
import { ReactNode } from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const server = setupServer(...mockApiHandlers);

// 테스트 시작 전에 목 서버를 실행
beforeAll(() => server.listen());

// 각 테스트 후에 요청 핸들러를 초기화
afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
  resetMockData();
});

// 테스트 종료 후에 목 서버 종료
afterAll(() => {
  vi.clearAllMocks();
  server.close();
});

// 테스트를 설정하는 헬퍼 함수
const setup = (component: ReactNode) => {
  const user = userEvent.setup();
  return {
    user,
    ...render(component),
  };
};

describe('일정 관리 애플리케이션 통합 테스트', () => {
  describe('일정 CRUD 및 기본 기능', () => {
    test('일정이 정상적으로 렌더링되는지 확인한다', async () => {
      vi.setSystemTime(new Date('2024-08-01T00:00:00Z'));
      setup(<App />);

      const view = screen.getByTestId('event-list');

      await waitFor(async () => {
        const events = await within(view).findAllByText((content) => {
          return [
            '팀 회의',
            '점심 약속',
            '프로젝트 마감',
            '생일 파티',
            '운동',
            '알림 테스트',
          ].some((eventText) => content.includes(eventText));
        });

        const expectedEvents = [
          '팀 회의',
          '점심 약속',
          '프로젝트 마감',
          '생일 파티',
          '운동',
          '알림 테스트',
        ];
        expectedEvents.forEach((expectedEvent) => {
          const event = events.find(
            (el) => el.textContent && el.textContent.includes(expectedEvent)
          );
          expect(event).toBeInTheDocument();
        });
      });
    });

    test('새로운 일정을 생성하고 모든 필드가 정확히 저장되는지 확인한다', async () => {
      vi.setSystemTime(new Date('2024-08-01T00:00:00Z'));
      const { user } = setup(<App />);

      // 입력 필드 선택
      const titleInput = screen.getByRole('textbox', { name: /제목/i });
      const dateInput = screen.getByLabelText(/날짜/i);
      const startTimeInput = screen.getByLabelText(/시작 시간/i);
      const endTimeInput = screen.getByLabelText(/종료 시간/i);
      const descriptionInput = screen.getByRole('textbox', { name: /설명/i });
      const locationInput = screen.getByRole('textbox', { name: /위치/i });
      const categorySelect = screen.getByRole('combobox', {
        name: /카테고리/i,
      });
      const alertSelect = screen.getByRole('combobox', { name: /알림 설정/i });
      const addButton = screen.getByRole('button', { name: /일정 추가/i });

      // 입력 값 설정
      await user.type(titleInput, '초원');
      await user.type(dateInput, '2024-08-31');
      await user.type(startTimeInput, '22:00');
      await user.type(endTimeInput, '23:00');
      await user.type(descriptionInput, '퇴근');
      await user.type(locationInput, '집');
      await user.selectOptions(categorySelect, '개인');
      await user.selectOptions(alertSelect, '10분 전');

      // 일정 추가 버튼 클릭
      await user.click(addButton);
      // screen.logTestingPlaygroundURL();

      // 일정이 렌더링되었는지 확인
      const view = screen.getByTestId('event-list');
      const newEvent = await within(view).findByText('초원');
      expect(newEvent).toBeInTheDocument();
    });

    test('기존 일정의 세부 정보를 수정하고 변경사항이 정확히 반영되는지 확인한다', async () => {
      vi.setSystemTime(new Date('2024-08-01T00:00:00Z'));

      const { user } = setup(<App />);

      const editButton = await screen.findAllByRole('button', {
        name: 'Edit event',
      });
      await user.click(editButton[0]);

      // 입력 필드 선택
      const titleInput = screen.getByRole('textbox', { name: /제목/i });

      // 입력 값 수정
      await user.clear(titleInput);
      await user.type(titleInput, '초원 수정');

      // 저장 버튼 클릭
      const saveButton = screen.getByTestId('event-submit-button');
      await user.click(saveButton);

      // 일정이 렌더링되었는지 확인
      const view = screen.getByTestId('event-list');
      const updatedEvent = await within(view).findByText('초원 수정');
      expect(updatedEvent).toBeInTheDocument();
    });

    test('일정을 삭제하고 더 이상 조회되지 않는지 확인한다', async () => {
      vi.setSystemTime(new Date('2024-08-01T00:00:00Z'));

      const { user } = setup(<App />);

      // 삭제할 일정의 제목을 '팀 회의'로 설정합니다.
      const eventTitleToDelete = '팀 회의';
      const deleteButton = await screen.findAllByRole('button', {
        name: 'Delete event',
      });
      await user.click(deleteButton[0]);
      // screen.logTestingPlaygroundURL();

      // 일정이 더 이상 렌더링되지 않는지 확인합니다.
      const view = screen.getByTestId('event-list');
      await waitFor(() => {
        expect(
          within(view).queryByText(eventTitleToDelete)
        ).not.toBeInTheDocument();
      });
    });
  });
});

describe('일정 뷰 및 필터링', () => {
  test('주별 뷰에 일정이 없으면, 일정이 표시되지 않아야 한다.', async () => {
    vi.setSystemTime(new Date('2024-08-05T00:00:00Z'));

    const { user } = setup(<App />);

    const viewSelector = screen.getByLabelText('view');
    await user.selectOptions(viewSelector, 'week');

    const view = screen.getByTestId('event-list');
    await waitFor(() => {
      expect(within(view).findAllByText('검색 결과가 없습니다.'));
    });
  });

  test('주별 뷰에 일정이 정확히 표시되는지 확인한다');
  test('월별 뷰에 일정이 없으면, 일정이 표시되지 않아야 한다.');
  test('월별 뷰에 일정이 정확히 표시되는지 확인한다');
});

// describe('알림 기능', () => {
//   test.fails('일정 알림을 설정하고 지정된 시간에 알림이 발생하는지 확인한다');
// });

// describe('검색 기능', () => {
//   test.fails('제목으로 일정을 검색하고 정확한 결과가 반환되는지 확인한다');
//   test.fails('제목으로 일정을 검색하고 정확한 결과가 반환되는지 확인한다');
//   test.fails('검색어를 지우면 모든 일정이 다시 표시되어야 한다');
// });

// describe('공휴일 표시', () => {
//   test.fails('달력에 1월 1일(신정)이 공휴일로 표시되는지 확인한다');
//   test.fails('달력에 5월 5일(어린이날)이 공휴일로 표시되는지 확인한다');
// });

// describe('일정 충돌 감지', () => {
//   test.fails('겹치는 시간에 새 일정을 추가할 때 경고가 표시되는지 확인한다');
//   test.fails(
//     '기존 일정의 시간을 수정하여 충돌이 발생할 때 경고가 표시되는지 확인한다'
//   );
// });
