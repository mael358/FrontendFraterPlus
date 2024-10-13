import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComprasComponent } from './compras.component';
import { AuthService } from '../../services/auth.service';
import { ComprasService } from '../../services/compras.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ComprasComponent', () => {
  let component: ComprasComponent;
  let fixture: ComponentFixture<ComprasComponent>;
  let comprasService: jasmine.SpyObj<ComprasService>;

  beforeEach(async () => {
    const comprasServiceSpy = jasmine.createSpyObj('ComprasService', ['getCompras']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ComprasComponent],
      providers: [
        //provideHttpClient(withInterceptors([tokenInterceptor]), withInterceptors([authInterceptor])),
        { provide: ComprasService, useValue: comprasServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 }) // Mocking route params
          }
        },
        AuthService
      ]
    }).compileComponents();

    comprasService = TestBed.inject(ComprasService) as jasmine.SpyObj<ComprasService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia crear componente', () => {
    expect(component).toBeTruthy();
  });

  it('should render "Compras" in a div with class "card-header"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cardHeaderElement = compiled.querySelector('.card-header') as HTMLElement;
  
    expect(cardHeaderElement?.textContent).toContain('Compras');
  });
  
  /*
  it('should have a method to add a new order', () => {
    component.addPedido({ id: 1, nombre: 'Nuevo Pedido' });
    expect(component.pedidos.length).toBe(1);
  });
  */
});
